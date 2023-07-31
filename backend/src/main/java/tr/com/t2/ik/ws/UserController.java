package tr.com.t2.ik.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.repository.PersonnelRepository;
import tr.com.t2.ik.security.service.T2UserDetailsService;
import tr.com.t2.ik.ws.dto.PersonnelDto;
import tr.com.t2.ik.ws.dto.PersonnelResponseDTO;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private PersonnelRepository personnelRepository;
    private T2UserDetailsService personnelService;

    @GetMapping("api/users")
    @PreAuthorize("hasRole('ROLE_USER')")
    @CrossOrigin
    public List<PersonnelDto> getMethod() {
        return personnelService.getAllUsers();
    }

    @GetMapping("api/user/role")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @CrossOrigin
    public boolean isAdmin() {
        return true;
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
