package demo.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EarningHistoryDTO {
    private Long id;
    private String activity;
    private Integer rewardCoin;
    private LocalDateTime time;
}
