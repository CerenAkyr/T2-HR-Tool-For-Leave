package tr.com.t2.ik.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tr.com.t2.ik.model.Personnel;
import java.util.Optional;

@Repository
public interface PersonnelRepository extends CrudRepository<Personnel, String> {
    Optional<Personnel> findByUsername(String username);
}