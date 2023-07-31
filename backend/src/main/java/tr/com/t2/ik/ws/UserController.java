package tr.com.t2.ik.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.repository.PersonnelRepository;
import tr.com.t2.ik.ws.dto.PersonnelDto;
import tr.com.t2.ik.ws.dto.PersonnelResponseDTO;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@PreAuthorize("hasRole('ROLE_USER')")
public class UserController {

    @Autowired
    private PersonnelRepository personnelRepository;

    @GetMapping
    @CrossOrigin
    public List<PersonnelDto> getMethod() {
        //<UserListDTO> personnelOptional = personnelRepository.findAllPersonnelDto();
        return personnelRepository.findAllPersonnelDto();
    }

    @GetMapping
    @RequestMapping("/{username}")
    public PersonnelResponseDTO getPersonnel(@PathVariable("username") String username) {
        Optional<Personnel> personnelOptional = personnelRepository.findById(username);
        if (personnelOptional.isPresent()) {
            return PersonnelResponseDTO
                            .builder()
                            .username(personnelOptional.get().getUsername())
                            .roles(personnelOptional.get().getRoles())
                            .build();
        }
        return null;
    }

}
