package demo.dto;

import demo.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VideoDTO {
    private Long id;
    private String ytVideoId;
    private Integer desiredView;
    private Integer actualView;
    private String additionalActivity;
    private Integer desiredAdditionalActivityAmount;
    private Integer actualAdditionalActivityAmount;
    private boolean isCompleted;
    private Integer coinPerView;
    private Integer timePerView;
    private Integer unusedCoin;
}
