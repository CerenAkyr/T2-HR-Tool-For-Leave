package tr.com.t2.ik.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.t2.ik.model.OffDayRequest;

@Repository
public interface RequestRepository extends JpaRepository <OffDayRequest, Long> {

}