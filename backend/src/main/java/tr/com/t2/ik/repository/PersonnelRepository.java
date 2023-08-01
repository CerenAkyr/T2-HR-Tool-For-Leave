package tr.com.t2.ik.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.ws.dto.PersonnelDto;

import java.util.List;
import java.util.Optional;

public interface PersonnelRepository extends CrudRepository<Personnel, String> {
    Optional<Personnel> findByUsername(String username);
}
