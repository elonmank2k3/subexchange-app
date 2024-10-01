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
    @Autowired
    VideoService videoService;

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

    @PostMapping("/get-video")
    public ResponseEntity<Map> getVideo(
            @RequestParam String googleUserId,
            @RequestParam(required = false) String additionalActivity
    ) {
//        return ResponseEntity.ok(videoService.getVideo(googleUserId, additionalActivity));
        return null;
    }

    @PostMapping("/add-video")
    public ResponseEntity<Map> addVideo(
            @RequestParam String googleUserId,
            @RequestParam String videoId,
            @RequestParam Integer desiredView,
            @RequestParam(required = false) String additionalActivity,
            @RequestParam(defaultValue = "0") Integer desiredAdditionalActivityAmount,
            @RequestParam Integer watchTime
    ) {
        return ResponseEntity.ok(videoService.addVideo(googleUserId, videoId, desiredView, additionalActivity, desiredAdditionalActivityAmount, watchTime));
    }


//    @PostMapping("/watch-video")
//    public ResponseEntity<Map> watchVideo() {}

    //    @PostMapping("/get-watch-reward")
//    public ResponseEntity<Map> watchVideo() {}

    //    @PostMapping("/get-bonus-reward")
//    public ResponseEntity<Map> watchVideo() {}

    //    @PostMapping("/get-ads-reward")
//    public ResponseEntity<Map> watchVideo() {}
}

