package demo.repository;

import demo.model.User;
import demo.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {

//    @Query(value = "SELECT * FROM video v WHERE v.user_id <> :userId AND v.id >= :startId AND v.desired_view > v.actual_view LIMIT 1", nativeQuery = true)
//    Video findVideoTypeView(@Param("userId") Long userId, @Param("startId") Long startId);

    @Query(value = "SELECT * FROM video WHERE id > :start_id AND uploaded_user_id <> :uploaded_user_id AND actual_view < desired_view LIMIT 1;", nativeQuery = true)
    Optional<Video> findVideoToWatch(@Param("uploaded_user_id") Long uploadedUserId, @Param("start_id") Long startId);
    @Query(value = "SELECT * FROM video WHERE id > :start_id AND uploaded_user_id <> :uploaded_user_id AND additional_activity = :additional_activity AND actual_additional_activity_amount < desired_additional_activity_amount LIMIT 1;", nativeQuery = true)
    Optional<Video> findVideoByAdditionalActivity(@Param("uploaded_user_id") Long uploadedUserId, @Param("start_id") Long startId, @Param("additional_activity") String additionalActivity);
    @Query(value = "SELECT EXISTS (SELECT 1 FROM video WHERE uploaded_user_id <> :uploaded_user_id AND actual_view < desired_view);", nativeQuery = true)
    int checkVideoToWatchAvailable(@Param("uploaded_user_id") Long uploadedUserId);
    @Query(value = "SELECT EXISTS (SELECT 1 FROM video WHERE uploaded_user_id <> :uploaded_user_id AND additional_activity = 'subscribe' AND actual_additional_activity_amount < desired_additional_activity_amount);", nativeQuery = true)
    int checkVideoToSubscribeAvailable(@Param("uploaded_user_id") Long uploadedUserId);
    @Query(value = "SELECT EXISTS (SELECT 1 FROM video WHERE uploaded_user_id <> :uploaded_user_id AND additional_activity = 'like' AND actual_additional_activity_amount < desired_additional_activity_amount);", nativeQuery = true)
    int checkVideoToLikeAvailable(@Param("uploaded_user_id") Long uploadedUserId);
    @Query(value = "SELECT EXISTS (SELECT 1 FROM video WHERE uploaded_user_id <> :uploaded_user_id AND additional_activity = 'comment' AND actual_additional_activity_amount < desired_additional_activity_amount);", nativeQuery = true)
    int checkVideoToCommentAvailable(@Param("uploaded_user_id") Long uploadedUserId);

    List<Video> findAllByUploadedUser(User user);
}
