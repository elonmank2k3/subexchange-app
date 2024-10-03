package demo.service;

import demo.dto.EarningHistoryDTO;
import demo.dto.VideoDTO;
import demo.exception.UserNotFoundException;
import demo.mapper.EarningHistoryMapper;
import demo.mapper.VideoMapper;
import demo.model.*;
import demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class VideoService {
    @Autowired
    VideoRepository videoRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    VideoWatchingHistoryRepository videoWatchingHistoryRepository;
    @Autowired
    ActivityTrackingRepository activityTrackingRepository;
    @Autowired
    EarningHistoryRepository earningHistoryRepository;

    public Map<String, Object> getUploadVideos(String googleUserId) {
        User user = userRepository.findByGoogleUserId(googleUserId).orElseThrow(() -> new UserNotFoundException());
        Map<String, Object> response = new HashMap<>();

        List<VideoDTO> videoDTOs = new ArrayList<>();
        List<Video> uploadedVideos = videoRepository.findAllByUploadedUser(user);

        for (Video video : uploadedVideos) {
            videoDTOs.add(VideoMapper.toDTO(video));
        }
        response.put("message", "Get upload video successfully");
        response.put("uploadedVideos", videoDTOs);
        return response;
    }
    public Map<String, Object> skipVideo(String googleUserId, Long videoId, String activityType) {
        Map<String, Object> response = new HashMap<>();
        User user = userRepository.findByGoogleUserId(googleUserId).orElseThrow(() -> new UserNotFoundException());
        Video video = videoRepository.findById(videoId).orElse(null);

        if (video == null) {
            response.put("message", "Video not found");
        }

        activityType = activityType.strip().toLowerCase();
        if (!(activityType.equals("watch") || activityType.equals("subscribe") ||
            activityType.equals("like") || activityType.equals("comment"))) {
            response.put("message", "Invalid input activity: " + activityType);
            return response;
        }

        // Save video to video watching history
        VideoWatchingHistory videoWatchingHistory = new VideoWatchingHistory();
        videoWatchingHistory.setViewer(user);
        videoWatchingHistory.setVideo(video);
        videoWatchingHistory.setActivity(activityType);
        videoWatchingHistoryRepository.save(videoWatchingHistory);

        if (activityType.equals("watch"))
            activityType = "no option";

        return getVideo(googleUserId, activityType);
    }
    public Map<String, Object> getVideoBonus(String googleUserId, boolean didGetDoubleCoin) {
        Map<String, Object> response = new HashMap<>();
        User user = userRepository.findByGoogleUserId(googleUserId).orElseThrow(() -> new UserNotFoundException());

        // Check if user meet requirement to get video bonus
        ActivityTracking activityTracking = user.getActivityTracking();
        if (activityTracking.getWatchToBonusCount() < 3) {
            response.put("message", "Watch more " + (3-activityTracking.getWatchToBonusCount()) +
                    " videos to get video bonus");
            return response;
        }

        int rewardCoin = 0;
        if (didGetDoubleCoin) {
            rewardCoin = 120;
        } else {
            rewardCoin = 60;
        }

        // Add coin to user
        user.setCoin(user.getCoin() + rewardCoin);
        userRepository.save(user);

        // Add Earning History
        EarningHistory earningHistory = new EarningHistory();
        earningHistory.setUser(user);
        earningHistory.setActivity("Get video bonus");
        earningHistory.setRewardCoin(rewardCoin);
        earningHistory.setTime(LocalDateTime.now());
        earningHistoryRepository.save(earningHistory);

        // Reset watch to bonus counter
        activityTracking.setWatchToBonusCount(0);
        activityTrackingRepository.save(activityTracking);

        response.put("message", "Get video bonus successfully");
        return response;
    }
    public Map<String, Object> deleteVideo(String googleUserId, Long videoId) {
        Map<String, Object> response = new HashMap<>();
        User user = userRepository.findByGoogleUserId(googleUserId).orElseThrow(() -> new UserNotFoundException());
        Video video = videoRepository.findById(videoId).orElse(null);
        if (video == null) {
            response.put("message", "Video not found");
            return response;
        }

        // Check if video belongs to user
        if (video.getUploadedUser().getId() != user.getId()) {
            response.put("message", "Delete failed caused by this video not belong to you");
            return response;
        }

        // Return unused coin to user
        int uncompletedView = video.getDesiredView() - video.getActualView();
        int uncompletedAdditionalActivityAmount = video.getDesiredAdditionalActivityAmount() - video.getActualAdditionalActivityAmount();
        int coinPerView = video.getCoinPerView();
        int unusedCoin = uncompletedView * coinPerView + uncompletedAdditionalActivityAmount * (coinPerView + 60);

        // Add coin to user
        user.setCoin(user.getCoin() + unusedCoin);
        userRepository.save(user);

        // Add earning history
        EarningHistory earningHistory = new EarningHistory();
        earningHistory.setUser(user);
        earningHistory.setRewardCoin(unusedCoin);
        earningHistory.setActivity("Delete video");
        earningHistory.setTime(LocalDateTime.now());
        earningHistoryRepository.save(earningHistory);
        videoRepository.delete(video);

        response.put("message", "Delete video successfully");
        return response;
    }
    public Map<String, Object> getAdsReward(String googleUserId) {
        User user = userRepository.findByGoogleUserId(googleUserId).orElseThrow(() -> new UserNotFoundException());
        Map<String, Object> response = new HashMap<>();

        // Add coin to user
        user.setCoin(user.getCoin() + 30);
        userRepository.save(user);

        // Add earning history
        EarningHistory earningHistory = new EarningHistory();
        earningHistory.setUser(user);
        earningHistory.setActivity("Watch ads");
        earningHistory.setRewardCoin(30);
        earningHistory.setTime(LocalDateTime.now());
        earningHistoryRepository.save(earningHistory);

        response.put("message", "Get 30 coins successfully");
        return response;
    }
    public Map<String, Object> getEarningHistories(String googleUserId) {
        User user = userRepository.findByGoogleUserId(googleUserId).orElseThrow(() -> new UserNotFoundException());
        Map<String, Object> response = new HashMap<>();

        List<EarningHistory> earningHistories = earningHistoryRepository.findTop20LatestEarningHistories(user.getId());
        List<EarningHistoryDTO> body = new ArrayList<>();
        for (EarningHistory earningHistory : earningHistories) {
            body.add(EarningHistoryMapper.toDTO(earningHistory));
        }

        response.put("message", "Get earning histories successfully");
        response.put("earningHistories", body);
        return response;
    }
    public Map<String, Object> interactWithVideo(String googleUserId, Long videoId, String activityType) {
        activityType = activityType.strip().toLowerCase();
        User viewer = userRepository.findByGoogleUserId(googleUserId).orElseThrow(() -> new UserNotFoundException());

        Map<String, Object> response = new HashMap<>();

        if (!(activityType.equals("watch") || activityType.equals("subscribe") ||
                activityType.equals("like") || activityType.equals("comment"))) {
            response.put("message", activityType + " failed caused by invalid activity type: " + activityType);
            return response;
        }

        Video video = videoRepository.findById(videoId).orElse(null);
        if (video == null) {
            response.put("message", activityType + " failed caused by video is not found");
            return response;
        }

        int didUserInteractWithVideo = videoWatchingHistoryRepository.didUserInteractWithVideo(viewer.getId(), videoId, activityType);
        if (didUserInteractWithVideo == 1) {
            response.put("message", "you already " + activityType + " this video");
            return response;
        }

        ActivityTracking activityTracking = viewer.getActivityTracking();
        activityTracking.setTargetVideo(video);
        activityTracking.setInteractVideoAt(LocalDateTime.now());
        activityTracking.setActivityType(activityType);
        activityTrackingRepository.save(activityTracking);

        response.put("message", "Wait " + video.getTimePerView() + " seconds to complete video");
        return response;
    }
    public Map<String, Object> getVideoReward(String googleUserId, String activity, boolean didGetDoubleCoin) {
        User user = userRepository.findByGoogleUserId(googleUserId).orElseThrow(() -> new UserNotFoundException());
        Map<String, Object> response = new HashMap<>();

        activity = activity.strip().toLowerCase();
        if (!(activity.equals("watch") || activity.equals("subscribe") ||
                activity.equals("like") || activity.equals("comment"))) {
            response.put("message", "Get video reward failed caused by invalid activity: " + activity);
            return response;
        }

        ActivityTracking activityTracking = user.getActivityTracking();
        if (!activity.equals(activityTracking.getActivityType())) {
            response.put("message", "You don't " + activity + " this video");
            return response;
        }

        // Check if there is video that user interact
        Video video = activityTracking.getTargetVideo();
        if (video == null) {
            response.put("message", "No video is being interacted");
            return response;
        }

        // Add Earning History
        EarningHistory earningHistory = new EarningHistory();

        int rewardCoin = 0;
        if (activity.equals("watch")) {
            rewardCoin = activityTracking.getTargetVideo().getCoinPerView();
            video.setActualView(video.getActualView() + 1);
        }
        else {
            rewardCoin = activityTracking.getTargetVideo().getCoinPerView() + 60;
            video.setActualAdditionalActivityAmount(video.getActualAdditionalActivityAmount() + 1);
        }
        videoRepository.save(video);

        if (didGetDoubleCoin)
            rewardCoin *= 2;
        earningHistory.setUser(user);
        earningHistory.setActivity(activity + " video");
        earningHistory.setTime(LocalDateTime.now());
        earningHistory.setRewardCoin(rewardCoin);
        earningHistoryRepository.save(earningHistory);

        // Add coin to user
        user.setCoin(user.getCoin() + rewardCoin);
        userRepository.save(user);

        // Add video watching history
        VideoWatchingHistory videoWatchingHistory = new VideoWatchingHistory();
        videoWatchingHistory.setViewer(user);
        videoWatchingHistory.setVideo(activityTracking.getTargetVideo());
        videoWatchingHistory.setActivity(activity);
        videoWatchingHistoryRepository.save(videoWatchingHistory);

        // Reset activityTracking
        activityTracking.setTargetVideo(null);
        activityTracking.setInteractVideoAt(null);
        activityTracking.setActivityType(null);
        activityTracking.setWatchToBonusCount(activityTracking.getWatchToBonusCount() - 1);
        activityTrackingRepository.save(activityTracking);

        response.put("message", "Get video reward successfully");
        return response;
    }
    public Map<String, Object> checkVideoComplete(String googleUserId) {
        User user = userRepository.findByGoogleUserId(googleUserId).orElseThrow(() -> new UserNotFoundException());
        Map<String, Object> response = new HashMap<>();

        ActivityTracking activityTracking = user.getActivityTracking();
        Video targetVideo = activityTracking.getTargetVideo();
        if (targetVideo == null) {
            response.put("message", "No video is being interacted");
            return response;
        }

        LocalDateTime finishedTime = LocalDateTime.now();
        LocalDateTime startedTime = activityTracking.getInteractVideoAt();
        Duration duration = Duration.between(startedTime, finishedTime);
        long watchingSeconds = duration.getSeconds();
        System.out.println("watching seconds: " + watchingSeconds);
        System.out.println("required Time " + activityTracking.getTargetVideo().getTimePerView());
        System.out.println(watchingSeconds >= activityTracking.getTargetVideo().getTimePerView());
        if (watchingSeconds >= activityTracking.getTargetVideo().getTimePerView()) {
            response.put("message", "Video complete successfully, you can receive reward");
        } else {
            response.put("message", "You must watch video at least " + activityTracking.getTargetVideo().getTimePerView());
        }
        return response;
    }
    public Map<String, Object> getVideo(String googleUserId, String additionalActivity) {
        additionalActivity = additionalActivity.strip().toLowerCase();

        User user = userRepository.findByGoogleUserId(googleUserId).orElseThrow(() -> new UserNotFoundException());
        Map<String, Object> response = new HashMap<>();
        
        Video video = null;

        String message =  validateInputAdditionalActivity(additionalActivity);
        if (!message.equals("")) {
            response.put("message", "Get video failed caused by " + message);
            return response;
        }

        switch (additionalActivity) {
            case "no option" -> {
                Long startId = (long) 0;
                while (true) {
                    int isVideoAvailable = videoRepository.checkVideoToWatchAvailable(user.getId());

                    if (isVideoAvailable == 0) {
                        response.put("message", "No video to watch, please comeback after one hour");
                        return response;
                    }

                    video = videoRepository.findVideoToWatch(user.getId(), startId).orElse(null);
                    if (video == null) {
                        videoWatchingHistoryRepository.deleteAllWatchedVideoBy(user.getId());
                        startId =(long) 0;
                        continue;
                    }
                    int didUserWatchVideo = videoWatchingHistoryRepository.didUserInteractWithVideo(user.getId(), video.getId(), "watch");
                    if (didUserWatchVideo == 1) {
                        startId = video.getId();
                    } else {
                        response.put("message", "Get video to watch successfully");
                        response.put("videoInfo", VideoMapper.toDTO(video));
                        return response;
                    }
                }
            }
            default -> {
                Long startId = (long) 0;
                while (true) {
                    int isVideoAvailable = 0;
                    if (additionalActivity.equals("subscribe"))
                        isVideoAvailable = videoRepository.checkVideoToSubscribeAvailable(user.getId());
                    else if (additionalActivity.equals("like"))
                        isVideoAvailable = videoRepository.checkVideoToLikeAvailable(user.getId());
                    else if (additionalActivity.equals("comment"))
                        isVideoAvailable = videoRepository.checkVideoToCommentAvailable(user.getId());

                    if (isVideoAvailable == 0) {
                        response.put("message", "No video to " + additionalActivity + ", please come back after one hour");
                        return response;
                    }

                    video = videoRepository.findVideoByAdditionalActivity(user.getId(), startId, additionalActivity).orElse(null);
                    if (video == null && additionalActivity.equals("comment")) {
                        videoWatchingHistoryRepository.deleteAllCommentedVideoBy(user.getId());
                        startId = (long) 0;
                        continue;
                    } else if (video == null) {
                        response.put("message", "No video to " + additionalActivity + ", please come back after one hour");
                        return response;
                    }

                    int didUserInteractWithVideo = videoWatchingHistoryRepository.didUserInteractWithVideo(user.getId(), video.getId(), additionalActivity);
                    if (didUserInteractWithVideo == 1) {
                        startId = video.getId();
                    } else {
                        response.put("message", "Get video to " + additionalActivity + " successfully");
                        response.put("videoInfo", VideoMapper.toDTO(video));
                        return response;
                    }
                }
            }
        }
    } // end getVideo()
    public Map<String, Object> uploadVideo(String googleUserId, String ytVideoId, Integer desiredView, String additionalActivity,
            Integer desiredAdditionalActivityAmount, Integer timePerView) {
        additionalActivity = additionalActivity.strip().toLowerCase();

        User user = userRepository.findByGoogleUserId(googleUserId).orElseThrow(() -> new UserNotFoundException());
        Map<String, Object> response = new HashMap<>();

        // Validate input video
        String message = validateInputVideo(ytVideoId, desiredView, additionalActivity, desiredAdditionalActivityAmount, timePerView);
        if (!message.equals("")) {
            response.put("message", message);
            return response;
        }

        // Check user is enough coin to add view
        Integer expense = (desiredView * timePerView) + desiredAdditionalActivityAmount * 60;
        if (expense > user.getCoin()) {
            response.put("message", "Add video failed caused by no enough coin");
            return response;
        }

        // Add video with default value
        Video video = new Video();
        video.setYtVideoId(ytVideoId);
        video.setUploadedUser(user);
        video.setDesiredView(0);
        video.setDesiredAdditionalActivityAmount(0);

        switch (additionalActivity) {
            case "no option" -> {
                video.setAdditionalActivity("no option");
                video.setDesiredView(desiredView);
            }
            default -> {
                video.setDesiredView(desiredView - desiredAdditionalActivityAmount);
                video.setAdditionalActivity(additionalActivity);
                video.setDesiredAdditionalActivityAmount(desiredAdditionalActivityAmount);
            }
        }

        video.setTimePerView(timePerView);
        video.setCoinPerView(timePerView);
        video.setCreatedTime(LocalDateTime.now());
        videoRepository.save(video);

        // Minus user coin
        user.setCoin(user.getCoin() - expense);
        userRepository.save(user);

        response.put("message", "Add video successfully");
        return response;
    }
    private String validateInputVideo(String ytVideoId, Integer desiredView, String additionalActivity, Integer desiredAdditionalActivityAmount, Integer timePerView) {
        // Check input valid video Id
        if (ytVideoId.strip().contains(" ")) {
           return "Add video failed caused by invalid input video: " + ytVideoId;
        }

        // Check valid input desired
        if (!(desiredView == 10 || desiredView == 30 || desiredView == 50 ||
                desiredView == 100 || desiredView == 200 || desiredView == 500 || desiredView == 1000)
        )
            return "Add video failed caused by desired view is not be one of options: 10, 30, 50, 100, 200, 500 or 1000";

        // Check valid input timePerView
        if (!(timePerView == 60 || timePerView == 90 || timePerView == 120 || timePerView == 180 ||
                timePerView == 240 || timePerView == 300))
            return "Add video failed caused by time per view is not be one of options: 60, 90, 120, 180, 240, 300 or 360";

        // Check input valid additional activity
        String message = validateInputAdditionalActivity(additionalActivity);
        if (!message.equals(""))
            return "Add video failed caused by " + message;

        //  Check valid desired additional activity amount
        if (desiredAdditionalActivityAmount < 0)
            return "Add video failed caused by invalid input desired amount smaller than 0";
        else if (desiredAdditionalActivityAmount > desiredView)
            return "Add video failed caused by inputting invalid desired " + additionalActivity + " larger than desired view";
        return "";
    }
    private String validateInputAdditionalActivity(String additionalActivity) {
        if (!(additionalActivity.equals("no option") || additionalActivity.equals("subscribe") ||
            additionalActivity.equals("like") || additionalActivity.equals("comment"))
        )
            return "additional activity is not be one of options: subscribe, like, comment or no option";
        return "";
    }
}
