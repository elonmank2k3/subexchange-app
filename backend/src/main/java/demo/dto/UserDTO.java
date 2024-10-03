package demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String googleUserId;
    private String name;
    private String picture;
    private String email;
    private Integer coin;
    private LocalDateTime premiumTime;
    private String code;
}
