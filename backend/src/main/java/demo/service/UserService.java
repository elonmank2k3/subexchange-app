package demo.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import demo.dto.ActivityTrackingDTO;
import demo.dto.InvitationRecordDTO;
import demo.dto.UserDTO;
import demo.exception.UserNotFoundException;
import demo.mapper.ActivityTrackingMapper;
import demo.mapper.InvitationRecordMapper;
import demo.mapper.UserMapper;
import demo.model.*;
import demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class UserService {
    @Autowired
    ActivityTrackingRepository activityTrackingRepository;
    @Autowired
    EarningHistoryRepository earningHistoryRepository;
    @Autowired
    SettingRepository settingRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    InvitationRecordRepository invitationRecordRepository;

    public Map<String, Object> getInvitationRecords(String googleUserId) {
        Map<String, Object> response = new HashMap<>();
        User user = userRepository.findByGoogleUserId(googleUserId).orElseThrow(() -> new UserNotFoundException());
        List<InvitationRecord> invitationRecords =  user.getInvitationRecords();
        List<InvitationRecordDTO> dtos = new ArrayList<>();

        for (InvitationRecord invitationRecord : invitationRecords) {
            dtos.add(InvitationRecordMapper.toDTO(invitationRecord));
        }

        response.put("message", "Get invitation records successfully");
        response.put("invitationRecords", dtos);
        return response;
    }
    public Map<String, Object> getUserInfo(String googleUserId) {
        User user = userRepository.findByGoogleUserId(googleUserId).orElseThrow(() -> new UserNotFoundException());
        Map<String, Object> response = new HashMap<>();

        response.put("message", "Get user info successfully");
        response.put("userInfo", UserMapper.toDTO(user));
        response.put("userActivity", ActivityTrackingMapper.toDTO(user.getActivityTracking()));
        return response;
    }
    public Map<String, Object> handleLogin(String authorization) {
        User user = null;

        try{
            user = findUserByAuthorization(authorization);
        } catch (AccessDeniedException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return response;
        }

        if (user == null) {
            user = new User();
            Map<String, Object> userInfo = null;
            try {
                userInfo = getUserInfoByAuthorization(authorization);
            } catch (AccessDeniedException e) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", e.getMessage());
                return response;
            }
            user.setGoogleUserId(String.valueOf(userInfo.get("sub")));
            user.setCode(createCode(String.valueOf(userInfo.get("sub"))));
            user.setName(String.valueOf(userInfo.get("name")));
            user.setEmail(String.valueOf(userInfo.get("email")));
            user.setPicture(String.valueOf(userInfo.get("picture")));
            user.setCoin(300);
            LocalDateTime time = LocalDateTime.now();
            user.setPremiumTime(time.plusDays(1));
            user.setCreatedTime(LocalDateTime.now());

            userRepository.save(user);
            user = userRepository.findByGoogleUserId(String.valueOf(userInfo.get("sub"))).orElse(null);
            saveEarningHistory(user, 300, "Get sign up bonus");

            createSettingAndActivityTracking(user);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Sign up successfully");
            response.put("userInfo", UserMapper.toDTO(user));
            return response;
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Sign in successfully");
            response.put("userInfo", UserMapper.toDTO(user));
            return response;
        }
    }
    private void createSettingAndActivityTracking(User user) {
        Setting setting = new Setting();
        setting.setUser(user);
        settingRepository.save(setting);

        ActivityTracking activityTracking = new ActivityTracking();
        activityTracking.setViewer(user);
        activityTrackingRepository.save(activityTracking);
    }
    public Map<String, String> handleReferralCodeInput(String googleUserId, String referralCode) {
        Map<String, String> response = new HashMap<>();
        User inviter = userRepository.findByCode(referralCode).orElse(null);

        if (inviter == null) {
            response.put("message", "Incorrect referral code");
        } else {
            User invitee = userRepository.findByGoogleUserId(googleUserId).orElseThrow(() -> new UserNotFoundException());

            // Check if user ever entered code
            boolean didEnterCode = invitee.getActivityTracking().isDidEnterReferralCode();
            if (didEnterCode) {
                response.put("message", "User has already entered referral code");
                return response;
            }

            // Check if user exists
            if (invitee == null) {
                response.put("message", "User not found");
                return response;
            }

            // Reward invitee/inviter
            rewardUserFromReferralCode(invitee, 300, "Enter referral code");
            ActivityTracking activityTracking = invitee.getActivityTracking();
            activityTracking.setDidEnterReferralCode(true);
            invitee.setActivityTracking(activityTracking);

            rewardUserFromReferralCode(inviter, 600, "Invite friend");
            saveInvitationRecord(inviter, invitee.getEmail());

            response.put("message", "Enter referral code successfully");
        }
        return response;
    }

    public User findUserByAuthorization(String authorization) throws AccessDeniedException {
        Map<String, Object> userInfo = getUserInfoByAuthorization(authorization);
        User user = userRepository.findByGoogleUserId(String.valueOf(userInfo.get("sub"))).orElseThrow(
                () -> new UserNotFoundException());
        return user;
    }

    // ------------------- Helper Function ----------------------
    private void saveInvitationRecord(User user, String inviteeEmail) {
        InvitationRecord invitationRecord = new InvitationRecord();

        invitationRecord.setUser(user);
        invitationRecord.setInviteeEmail(inviteeEmail);
        invitationRecord.setTime(LocalDateTime.now());

        invitationRecordRepository.save(invitationRecord);
    }
    private void saveEarningHistory(User user, Integer rewardCoin, String activity) {
        EarningHistory earningHistory = new EarningHistory();
        earningHistory.setUser(user);
        earningHistory.setRewardCoin(rewardCoin);
        earningHistory.setTime(LocalDateTime.now());
        earningHistory.setActivity(activity);
        earningHistoryRepository.save(earningHistory);
    }
    private void rewardUserFromReferralCode(User user, Integer coinPerView, String activityName) {
        user.setCoin(user.getCoin() + coinPerView);
        user.setPremiumTime(user.getPremiumTime().plusDays(1));
        
        saveEarningHistory(user, coinPerView, activityName);
        userRepository.save(user);
    }
    private String createCode(String googleUserId) {
        return googleUserId.substring(googleUserId.length()-6);
    }
    private Map<String, Object> getUserInfoByAuthorization(String authorization) throws AccessDeniedException {
        String jwt = authorization;
        String[] parts = jwt.split("\\.");
        if (parts.length == 3) {
            String json = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> map = null;
            try {
                map = objectMapper.readValue(json, new TypeReference<Map<String, Object>>() {});
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            return map;
        } else {
            throw new AccessDeniedException("Sign in failed");
        }
    }
}
