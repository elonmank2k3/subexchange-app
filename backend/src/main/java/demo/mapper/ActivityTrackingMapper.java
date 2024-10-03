package demo.mapper;

import demo.dto.ActivityTrackingDTO;
import demo.model.ActivityTracking;

public class ActivityTrackingMapper {
    public static ActivityTrackingDTO toDTO(ActivityTracking activityTracking) {
        ActivityTrackingDTO dto = new ActivityTrackingDTO();
        dto.setDidRate(activityTracking.isDidRate());
        dto.setWatchToBonusCount(activityTracking.getWatchToBonusCount());
        return dto;
    }
}
