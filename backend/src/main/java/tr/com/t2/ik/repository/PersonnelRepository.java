package tr.com.t2.ik.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.ws.dto.PersonnelDto;

import java.util.List;

public interface PersonnelRepository extends CrudRepository<Personnel, String> {
    //@Query("SELECT p.firstname as firstname, p.lastname as lastname, p.username as username, p.birthday as birthday, p.activity as status, p.gender as gender, p.email as email FROM Personnel p")
    //List<PersonnelDto> findAllPersonnelDto();
}
