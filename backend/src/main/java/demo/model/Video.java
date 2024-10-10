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
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "VARCHAR(20)", nullable = false)
    private String ytVideoId;
    @Column(columnDefinition = "INT", nullable = false)
    private Integer desiredView;
    @Column(columnDefinition = "INT DEFAULT 0", insertable = false)
    private Integer actualView;
    @Column(columnDefinition = "VARCHAR(50)", nullable = false)
    private String additionalActivity;
    @Column(columnDefinition = "INT", name = "desired_additional_activity_amount", nullable = false)
    private Integer desiredAdditionalActivityAmount;
    @Column(columnDefinition = "INT DEFAULT 0", name = "actual_additional_activity_amount", insertable = false)
    private Integer actualAdditionalActivityAmount;
    @Column(columnDefinition = "INT", nullable = false)
    private Integer coinPerView;
    @Column(columnDefinition = "INT", nullable = false)
    private Integer timePerView;
    @Column(columnDefinition = "DATETIME", nullable = false)
    private LocalDateTime createdTime;
    @JoinColumn(name = "uploaded_user_id")
    @ManyToOne
    User uploadedUser;
    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL, orphanRemoval = true)
    List<VideoWatchingHistory> videoWatchingHistories;
}
