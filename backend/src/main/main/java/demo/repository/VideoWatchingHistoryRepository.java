package demo.repository;
import demo.model.VideoWatchingHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoWatchingHistoryRepository extends JpaRepository<VideoWatchingHistory, Long> {
}
