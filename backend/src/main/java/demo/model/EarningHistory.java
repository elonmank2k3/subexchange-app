package demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EarningHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "VARCHAR(20)", nullable = false)
    private String activity;
    @Column(columnDefinition = "INT", nullable = false)
    private Integer rewardCoin;
    @Column(columnDefinition = "DATETIME", nullable = false)
    private LocalDateTime time;
    @ManyToOne
    User user;
}
