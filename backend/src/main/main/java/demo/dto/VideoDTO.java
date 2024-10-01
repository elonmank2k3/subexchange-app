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
    private String videoId;
    private Integer desiredView;
    private Integer desiredViewSubscribe;
    private Integer desiredViewLike;
    private Integer desiredViewComment;
    private Integer actualView;
    private Integer actualViewSubscribe;
    private Integer actualViewLike;
    private Integer actualViewComment;
    private Integer coinPerView;
    private Integer watchTime;
}
