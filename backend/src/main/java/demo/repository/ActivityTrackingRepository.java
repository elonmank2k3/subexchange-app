package demo.repository;

import demo.model.ActivityTracking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityTrackingRepository extends JpaRepository<ActivityTracking, Long> {
}
