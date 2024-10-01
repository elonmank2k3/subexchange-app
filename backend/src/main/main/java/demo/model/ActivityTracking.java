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
public class ActivityTracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "VARCHAR(20)", name = "watching_video_id")
    private String watchingVideoId;
    @Column(columnDefinition = "INT DEFAULT 0", insertable = false)
    private Integer coinPerView;
    @Column(columnDefinition = "DATETIME", name = "started_watching_video_time")
    private LocalDateTime startedWatchingVideoTime;
    @Column(columnDefinition = "INT DEFAULT 3", name = "watch_to_bonus_count", insertable = false)
    private Integer watchToBonusCount;
    @Column(columnDefinition = "BOOLEAN DEFAULT 0", insertable = false)
    private boolean didRate;
    @Column(columnDefinition = "BOOLEAN DEFAULT 0", name = "did_make_video_review", insertable = false)
    private boolean didMakeVideoReview;
    @Column(columnDefinition = "BOOLEAN DEFAULT 0", name = "did_enter_referral_code", insertable = false)
    private boolean didEnterReferralCode;
    @OneToOne
    User user;
}
