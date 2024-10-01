package demo.service;

import demo.mapper.VideoMapper;
import demo.model.User;
import demo.model.Video;
import demo.repository.UserRepository;
import demo.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class VideoService {
    @Autowired
    VideoRepository videoRepository;
    @Autowired
    UserRepository userRepository;
    public Map<String, Object> getVideo(String googleUserId, String additionalActivity, List<String> skippedVideos) {
        Map<String, Object> response = new HashMap<>();
        User user = userRepository.findByGoogleUserId(googleUserId).orElse(null);

        // Check if user exists
        if (user == null) {
            response.put("message", "Get video failed caused by user not found");
            return response;
        }

        Long startId = (long) 1;
        while (true) {
            Video video = videoRepository.getWatchingVideo(user.getId(), startId);

            // Check if there is no available video
            if (video == null) {
                response.put("message", "No available video");
                break;
            }

            // Check if video is in skippedVideos
            if (skippedVideos.contains(video.getVideoId())) {
                startId = video.getId();
            } else {
                response.put("message", "Get video successfully");
                response.put("videoInfo", VideoMapper.toDTO(video));
                break;
            }
        }

        return response;
    }

    public Map<String, Object> addVideo(String googleUserId, String videoId, Integer desiredView, String additionalActivity,
            Integer desiredAdditionalActivityAmount, Integer watchTime) {

        User user = userRepository.findByGoogleUserId(googleUserId).orElse(null);
        Map<String, Object> response = new HashMap<>();

        // Check if user exists
        if (user == null) {
            response.put("message", "Add video failed caused by user not found");
        }

        // Validate input video
        String message = validateInputVideo(videoId, desiredView, additionalActivity, desiredAdditionalActivityAmount, watchTime);
        if (!message.equals("")) {
            response.put("message", message);
            return response;
        }

        // Check user is enough coin to add view
        Integer expense = (desiredView * watchTime) + desiredAdditionalActivityAmount * 60;
        if (expense > user.getCoin()) {
            response.put("message", "Add video failed caused by no enough coin");
            return response;
        }

        // Add video
        Video video = new Video();
        video.setVideoId(videoId);
        video.setUser(user);
        video.setDesiredView(0);
        video.setDesiredViewSubscribe(0);
        video.setDesiredViewLike(0);
        video.setDesiredViewComment(0);
        if (!(additionalActivity == null)) {
            if (!additionalActivity.equalsIgnoreCase("No option")) {
                if (additionalActivity.equalsIgnoreCase("Subscribe"))
                    video.setDesiredViewSubscribe(desiredAdditionalActivityAmount);
                else if (additionalActivity.equalsIgnoreCase("Like"))
                    video.setDesiredViewLike(desiredAdditionalActivityAmount);
                else if (additionalActivity.equalsIgnoreCase("Comment"))
                    video.setDesiredViewComment(desiredAdditionalActivityAmount);

                video.setDesiredView(desiredView-desiredAdditionalActivityAmount);
            } else
                video.setDesiredView(desiredView);
        } else
            video.setDesiredView(desiredView);

        video.setWatchTime(watchTime);
        video.setCoinPerView(watchTime);
        video.setCreatedTime(LocalDateTime.now());
        videoRepository.save(video);

        // Minus user coin
        user.setCoin(user.getCoin() - expense);
        userRepository.save(user);

        response.put("message", "Add video successfully");
        return response;
    }

    private String validateInputVideo(String videoId, Integer desiredView, String additionalActivity, Integer desiredAdditionalActivityAmount, Integer watchTime) {
        // Check input valid video Id
        if (videoId.strip().contains(" ")) {
           return "Add video failed caused by invalid input video: " + videoId;
        }

        // Check valid input desired
        if (!(desiredView == 10 || desiredView == 30 || desiredView == 50 ||
                desiredView == 100 || desiredView == 200 || desiredView == 500 || desiredView == 1000)
        )
            return "Add video failed caused by desired view is not be one of options: 10, 30, 50, 100, 200, 500 or 1000";

        // Check valid input watchTime
        if (!(watchTime % 60 == 0 && (watchTime >= 60 || watchTime >= 360)))
            return "Add video failed caused by time per view is not be one of options: 60, 90, 120, 180, 240, 300 or 360";

        // Check input valid additional activity
        if (additionalActivity != null) {
            if (!(additionalActivity.equalsIgnoreCase("subscribe") ||
                    additionalActivity.equalsIgnoreCase("like") ||
                    additionalActivity.equalsIgnoreCase("comment") ||
                    additionalActivity.equalsIgnoreCase("No option"))
            ) {
                return "Add video failed caused by additional activity is not be one of options: Subscribe, Like, Comment or No option";
            }
        }

        //  Check valid desired additional activity amount
        if (desiredAdditionalActivityAmount < 0)
            return "Add video failed caused by invalid input desired amount smaller than 0";
        else if (desiredAdditionalActivityAmount > desiredView)
            return "Add video failed caused by inputting invalid desired " + additionalActivity.toLowerCase() + " larger than desired view";

        return "";
    }
}
