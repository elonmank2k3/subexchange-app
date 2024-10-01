package demo.mapper;

import demo.dto.VideoDTO;
import demo.model.Video;

public class VideoMapper {
    public static VideoDTO toDTO(Video video) {
        VideoDTO dto = new VideoDTO();
        dto.setVideoId(video.getVideoId());
        dto.setDesiredView(video.getDesiredView());
        dto.setDesiredViewSubscribe(video.getDesiredViewSubscribe());
        dto.setDesiredViewLike(video.getDesiredViewLike());
        dto.setDesiredViewComment(video.getDesiredViewComment());
        dto.setActualView(video.getActualView());
        dto.setActualViewSubscribe(video.getActualViewSubscribe());
        dto.setActualViewLike(video.getActualViewLike());
        dto.setActualViewComment(video.getActualViewComment());
        dto.setCoinPerView(video.getCoinPerView());
        dto.setWatchTime(video.getWatchTime());
        return dto;
    }
}
