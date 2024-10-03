package demo.repository;
import demo.model.VideoWatchingHistory;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoWatchingHistoryRepository extends JpaRepository<VideoWatchingHistory, Long> {
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM video_watching_history WHERE viewer_id = :viewer_id AND activity = 'watch';", nativeQuery = true)
    void deleteAllWatchedVideoBy(@Param("viewer_id") Long viewerId);
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM video_watching_history WHERE viewer_id = :viewer_id AND activity = 'comment';", nativeQuery = true)
    void deleteAllCommentedVideoBy(@Param("viewer_id") Long viewerId);
    @Query(value = "SELECT EXISTS (SELECT 1 FROM video_watching_history WHERE viewer_id = :viewer_id AND video_id = :video_id AND activity = :activity);", nativeQuery = true)
    int didUserInteractWithVideo(@Param("viewer_id") Long viewerId, @Param("video_id") Long videoId, @Param("activity") String activity);

}
