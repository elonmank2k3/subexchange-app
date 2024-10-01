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
    private String videoId;
    @ManyToOne
    User user;
    @Column(columnDefinition = "INT", nullable = false)
    private Integer desiredView;
    @Column(columnDefinition = "INT", nullable = false)
    private Integer desiredViewSubscribe;
    @Column(columnDefinition = "INT", nullable = false)
    private Integer desiredViewLike;
    @Column(columnDefinition = "INT", nullable = false)
    private Integer desiredViewComment;
    @Column(columnDefinition = "INT DEFAULT 0", insertable = false)
    private Integer actualView;
    @Column(columnDefinition = "INT DEFAULT 0", insertable = false)
    private Integer actualViewSubscribe;
    @Column(columnDefinition = "INT DEFAULT 0", insertable = false)
    private Integer actualViewLike;
    @Column(columnDefinition = "INT DEFAULT 0", insertable = false)
    private Integer actualViewComment;
    @Column(columnDefinition = "INT", nullable = false)
    private Integer coinPerView;
    @Column(columnDefinition = "INT", nullable = false)
    private Integer watchTime;
    @Column(columnDefinition = "DATETIME", nullable = false)
    private LocalDateTime createdTime;
    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL, orphanRemoval = true)
    List<VideoWatchingHistory> videoWatchingHistories;
}
