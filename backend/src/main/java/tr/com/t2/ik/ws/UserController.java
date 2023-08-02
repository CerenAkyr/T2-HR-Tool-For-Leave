package tr.com.t2.ik.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.model.Role;
import tr.com.t2.ik.repository.PersonnelRepository;
import tr.com.t2.ik.security.service.T2UserDetailsService;
import tr.com.t2.ik.ws.dto.NewPersonnelDTO;
import tr.com.t2.ik.ws.dto.PersonnelDto;
import tr.com.t2.ik.ws.dto.PersonnelResponseDTO;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
public class UserController {

    @Autowired
    private PersonnelRepository personnelRepository;
    @Autowired
    private T2UserDetailsService personnelService;

    @CrossOrigin
    @GetMapping("api/users")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<PersonnelDto> getMethod() {
        return personnelService.getAllUsers();
    }

    @CrossOrigin
    @GetMapping("/role/{username}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public String getRole(@PathVariable("username") String username) {
        Optional<Personnel> personnelOptional = personnelRepository.findById(username);
        if (personnelOptional.isPresent()) {
            Set<Role> roles = personnelOptional.get().getRoles();
            if (roles != null && roles.stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
                return "ROLE_ADMIN";
            }
        }
        return "ROLE_USER";
    }

    @GetMapping("/info/{username}")
    @CrossOrigin
    public PersonnelDto getPersonnelInfo(@PathVariable("username") String username) {
        if ( personnelService.getUserByUsername(username) != null )
            return personnelService.getUserByUsername(username);
        return null;
    }

    @PostMapping("/passive/{username}")
    @CrossOrigin
    public Personnel makePassivePersonnel(@PathVariable("username") String username) {
        if ( personnelService.getUserByUsername(username) != null )
            return personnelService.passivePersonnelActivity(username);
        return null;
    }

    @PostMapping("/active/{username}")
    @CrossOrigin
    public Personnel makeActivePersonnel(@PathVariable("username") String username) {
        if ( personnelService.getUserByUsername(username) != null )
            return personnelService.activatePersonnelActivity(username);
        return null;
    }

    @PostMapping("/new-user")
    @CrossOrigin
    public ResponseEntity<Personnel> createNewPersonnel(@RequestBody @Validated NewPersonnelDTO newPersonnelDTO) {
        Personnel newUser = personnelService.createUser(newPersonnelDTO);
        System.out.println("-----------GELEN USER-------------");
        System.out.println(newPersonnelDTO);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

}
