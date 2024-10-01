package demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "VARCHAR(30)", name = "google_user_id", nullable = false)
    private String googleUserId;
    @Column(columnDefinition = "CHAR(6)", nullable = false)
    private String code;
    @Column(columnDefinition = "VARCHAR(100)", nullable = false)
    private String name;
    @Column(columnDefinition = "VARCHAR(100)", nullable = false)
    private String email;
    @Column(columnDefinition = "VARCHAR(255)", nullable = false)
    private String picture;
    @Column(columnDefinition = "INT", nullable = false)
    private Integer coin;
    @Column(columnDefinition = "DATETIME", nullable = false)
    private LocalDateTime premiumTime;
    @Column(columnDefinition = "DATETIME", nullable = false)
    private LocalDateTime createdTime;
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    Setting setting;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    List<EarningHistory> earningHistories;
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    ActivityTracking activityTracking;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Video> videos;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    List<VideoWatchingHistory> videoWatchingHistories;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    List<InvitationRecord> invitationRecords;
}
