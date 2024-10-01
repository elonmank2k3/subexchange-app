package demo.repository;

import demo.model.EarningHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EarningHistoryRepository extends JpaRepository<EarningHistory, Long> {
}
