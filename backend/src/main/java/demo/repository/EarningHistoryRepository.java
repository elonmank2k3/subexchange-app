package demo.repository;

import demo.model.EarningHistory;
import demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EarningHistoryRepository extends JpaRepository<EarningHistory, Long> {
    @Query(value = "SELECT * FROM earning_history WHERE user_id = :user_id ORDER BY time DESC LIMIT 20", nativeQuery = true)
    List<EarningHistory> findTop20LatestEarningHistories(@Param("user_id") Long userId);
}
