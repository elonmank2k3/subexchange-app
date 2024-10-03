package demo.controller;

import demo.model.Video;
import demo.service.UserService;
import demo.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/sign-in")
    public ResponseEntity<Map> handleSignIn(
            @RequestParam String authorization
    ) {
        return ResponseEntity.ok(userService.handleLogin(authorization));
    }

    @PostMapping("/referral-code-input")
    public ResponseEntity<Map> handleReferralCodeInput(
            @RequestParam String googleUserId,
            @RequestParam String referralCode
        ) {
        return ResponseEntity.ok(userService.handleReferralCodeInput(googleUserId, referralCode));
    }

    @PostMapping("/get-user-info")
    public ResponseEntity<Map> getUserInfo(
            @RequestParam String googleUserId
    ) {
        return ResponseEntity.ok(userService.getUserInfo(googleUserId));
    }

    @PostMapping("/get-invitation-records")
    public ResponseEntity<Map> getFriends(
            @RequestParam String googleUserId
    ) {
        return ResponseEntity.ok(userService.getInvitationRecords(googleUserId));
    }
}

