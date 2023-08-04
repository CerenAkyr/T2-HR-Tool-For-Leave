package tr.com.t2.ik.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.t2.ik.model.OffDayRequest;
import tr.com.t2.ik.model.Personnel;

import java.util.Optional;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository <OffDayRequest, Long> {

    Optional<OffDayRequest> findOffDayRequestByPersonnel(Personnel personnel);


    List<OffDayRequest> findByRequestStatus(String pending);

}