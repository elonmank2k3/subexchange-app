package demo.repository;

import demo.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {

    @Query(value = "SELECT * FROM video v WHERE v.user_id <> :userId AND v.id >= :startId AND v.desired_view > v.actual_view LIMIT 1", nativeQuery = true)
    Video getWatchingVideo(@Param("userId") Long userId, @Param("startId") Long startId);
}
