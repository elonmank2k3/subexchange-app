package demo.mapper;

import demo.dto.EarningHistoryDTO;
import demo.model.EarningHistory;

public class EarningHistoryMapper {
    public static EarningHistoryDTO toDTO (EarningHistory earningHistory) {
        EarningHistoryDTO dto = new EarningHistoryDTO();
        dto.setId(earningHistory.getId());
        dto.setActivity(earningHistory.getActivity());
        dto.setTime(earningHistory.getTime());
        dto.setRewardCoin(earningHistory.getRewardCoin());
        return dto;
    }
}
