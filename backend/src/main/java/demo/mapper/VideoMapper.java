package demo.mapper;

import demo.dto.VideoDTO;
import demo.model.Video;

public class VideoMapper {
    public static VideoDTO toDTO(Video video) {
        VideoDTO dto = new VideoDTO();
        dto.setId(video.getId());
        dto.setYtVideoId(video.getYtVideoId());
        dto.setDesiredView(video.getDesiredView());
        dto.setActualView(video.getActualView());
        dto.setAdditionalActivity(video.getAdditionalActivity());
        dto.setDesiredAdditionalActivityAmount(video.getDesiredAdditionalActivityAmount());
        dto.setActualAdditionalActivityAmount(video.getActualAdditionalActivityAmount());
        dto.setCoinPerView(video.getCoinPerView());
        dto.setTimePerView(video.getTimePerView());
        boolean isCompleted = true;
        if (!(video.getActualView() >= video.getDesiredView() &&
                video.getActualAdditionalActivityAmount() >= video.getDesiredAdditionalActivityAmount()))
            isCompleted = false;
        dto.setCompleted(isCompleted);

        int coinPerView = video.getCoinPerView();
        int uncompletedView = video.getDesiredView() - video.getActualView();
        int uncompletedAdditionalActivityAmount = video.getDesiredAdditionalActivityAmount() - video.getActualAdditionalActivityAmount();
        int unusedCoin = uncompletedView * coinPerView + uncompletedAdditionalActivityAmount * (coinPerView + 60);
        dto.setUnusedCoin(unusedCoin);
        return dto;
    }
}
