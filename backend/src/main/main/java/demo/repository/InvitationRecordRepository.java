package demo.repository;

import demo.model.InvitationRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

@Repository
public interface InvitationRecordRepository extends JpaRepository<InvitationRecord, Long> {
}
