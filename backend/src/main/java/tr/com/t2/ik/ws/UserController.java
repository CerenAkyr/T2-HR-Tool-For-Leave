package tr.com.t2.ik.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.model.Role;
import tr.com.t2.ik.repository.PersonnelRepository;
import tr.com.t2.ik.security.service.T2UserDetailsService;
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


    @GetMapping
    @RequestMapping("/role/{username}")
    @CrossOrigin
    public Boolean getRole(@PathVariable("username") String username) {
        Optional<Personnel> personnelOptional = personnelRepository.findById(username);
        if (personnelOptional.isPresent()) {
            Set<Role> roles = personnelOptional.get().getRoles();
            if (roles != null && roles.stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
                return true;
            }
        }
        return false;
    }

    @GetMapping("/info/{username}")
    @CrossOrigin
    public PersonnelDto getPersonnel(@PathVariable("username") String username) {
        //System.out.println(personnelService.getUserInfo(username));
        //if ( personnelService.getUserInfo(username) != null )
        //    return personnelService.getUserInfo(username);
        return null;
    }

}
