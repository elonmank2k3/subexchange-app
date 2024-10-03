package demo.controller;

import demo.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class VideoController {
    @Autowired
    VideoService videoService;

    @PostMapping("/get-video")
    public ResponseEntity<Map> getVideo(
            @RequestParam String googleUserId,
            @RequestParam(required = false) String additionalActivity
    ) {
        return ResponseEntity.ok(videoService.getVideo(googleUserId, additionalActivity));
    }

    @PostMapping("/upload-video")
    public ResponseEntity<Map> uploadVideo(
            @RequestParam String googleUserId,
            @RequestParam String ytVideoId,
            @RequestParam Integer desiredView,
            @RequestParam String additionalActivity,
            @RequestParam(defaultValue = "0") Integer desiredAdditionalActivityAmount,
            @RequestParam(defaultValue = "0") Integer timePerView
    ) {
        return ResponseEntity.ok(videoService.uploadVideo(googleUserId, ytVideoId, desiredView, additionalActivity, desiredAdditionalActivityAmount, timePerView));
    }

    @PostMapping("/interact-video")
    public ResponseEntity<Map> interactWithVideo(
            @RequestParam String googleUserId,
            @RequestParam Long videoId,
            @RequestParam String activityType
    ) {
        return ResponseEntity.ok(videoService.interactWithVideo(googleUserId, videoId, activityType));
    }

    @PostMapping("/check-video-complete")
    public ResponseEntity<Map> checkVideoComplete(
            @RequestParam String googleUserId
    ) {
        return ResponseEntity.ok(videoService.checkVideoComplete(googleUserId));
    }

    @PostMapping("/get-video-reward")
    public ResponseEntity<Map> getVideoReward(
            @RequestParam String googleUserId,
            @RequestParam String activity,
            @RequestParam boolean didGetDoubleCoin
    ) {
        return ResponseEntity.ok(videoService.getVideoReward(googleUserId, activity, didGetDoubleCoin));
    }

    @PostMapping("/get-video-bonus")
    public ResponseEntity<Map> getVideoBonus(
            @RequestParam String googleUserId,
            @RequestParam boolean didGetDoubleCoin
    ) {
        return ResponseEntity.ok(videoService.getVideoBonus(googleUserId, didGetDoubleCoin));
    }

    @PostMapping("/get-ads-reward")
    public ResponseEntity<Map> getAdsReward(
            @RequestParam String googleUserId
    ) {
        return ResponseEntity.ok(videoService.getAdsReward(googleUserId));
    }

    @PostMapping("/get-earning-histories")
    public ResponseEntity<Map> getEarningHistories(
            @RequestParam String googleUserId
    ) {
        return ResponseEntity.ok(videoService.getEarningHistories(googleUserId));
    }

    @PostMapping("/delete-video")
    public ResponseEntity<Map> deleteVideo(
            @RequestParam String googleUserId,
            @RequestParam Long videoId
    ) {
        return ResponseEntity.ok(videoService.deleteVideo(googleUserId, videoId));
    }

    @PostMapping("/skip-video")
    public ResponseEntity<Map> skipVideo(
            @RequestParam String googleUserId,
            @RequestParam Long videoId,
            @RequestParam String activityType
    ) {
        return ResponseEntity.ok(videoService.skipVideo(googleUserId, videoId, activityType));
    }

    @PostMapping("/get-uploaded-videos")
    public ResponseEntity<Map> getUploadedVideos(
            @RequestParam String googleUserId
    ) {
        return ResponseEntity.ok(videoService.getUploadVideos(googleUserId));
    }
}
