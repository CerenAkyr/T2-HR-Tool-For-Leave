package tr.com.t2.ik.security.service;

import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import tr.com.t2.ik.mapper.AutoPersonnelMapper;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.repository.PersonnelRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import tr.com.t2.ik.repository.RoleRepository;
import tr.com.t2.ik.ws.dto.NewPersonnelDTO;
import tr.com.t2.ik.ws.dto.PersonnelDto;
import tr.com.t2.ik.model.Role;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class T2UserDetailsService implements UserDetailsService {

    private PersonnelRepository personnelRepository;

    private RoleRepository roleRepository;

    public T2UserDetailsService(PersonnelRepository personnelRepository, RoleRepository roleRepository) {
        this.personnelRepository = personnelRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Personnel> personnel = personnelRepository.findById(username);
        if (personnel.isPresent()) {
            return User.withUsername(
                            personnel.get().getUsername())
                    .password(personnel.get().getPassword())
                    .accountExpired(false)
                    .credentialsExpired(false)
                    .authorities(personnel.get().getRoles())
                    .disabled(false).accountLocked(false).build();
        } else {
            throw new UsernameNotFoundException(username);
        }
    }


    public List<PersonnelDto> getAllUsers() {
        Iterable<Personnel> users = personnelRepository.findAll();
        return StreamSupport.stream(users.spliterator(), false) // Convert Iterable to Stream
                .map(user -> AutoPersonnelMapper.MAPPER.mapToPersonnelDto(user))
                .collect(Collectors.toList());
    }

    public PersonnelDto getUserByUsername(String username) {
        Optional<Personnel> userOptional = personnelRepository.findByUsername(username);
        return userOptional.map(user -> AutoPersonnelMapper.MAPPER.mapToPersonnelDto(user)).orElse(null);
    }

    @Transactional
    public Personnel passivePersonnelActivity(String username) {
        Optional<Personnel> userOptional = personnelRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            Personnel user = userOptional.get();
            user.setActivity("Pasif");
            return personnelRepository.save(user);
        }
        return null; // User not found
    }

    @Transactional
    public Personnel activatePersonnelActivity(String username) {
        Optional<Personnel> userOptional = personnelRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            Personnel user = userOptional.get();
            user.setActivity("Aktif");
            return personnelRepository.save(user);
        }
        return null; // User not found
    }

    public Personnel createUser(NewPersonnelDTO newUserDto) {

        Role admin = new Role();
        admin.setName("ROLE_ADMIN");
        Role user = new Role();
        user.setName("ROLE_USER");
        roleRepository.saveAll(Arrays.asList(admin,user));

        Personnel newUser = new Personnel();
        newUser.setUsername(newUserDto.getUsername());
        newUser.setEmail(newUserDto.getEmail());
        newUser.setPassword(new BCryptPasswordEncoder().encode(newUserDto.getPassword()));
        newUser.setFirstname(newUserDto.getFirstname());
        newUser.setLastname(newUserDto.getLastname());
        newUser.setGender(newUserDto.getGender());
        newUser.setBirthday(newUserDto.getBirthday());
        newUser.setActivity("Aktif");
        newUser.setRoles(new HashSet<>(Collections.singletonList(user)));
        Instant now = Instant.now();
        newUser.setStartDate(Date.from(now));
        System.out.println(newUser);
        return personnelRepository.save(newUser);
    }

    public Personnel updatePersonnel(NewPersonnelDTO updatePersonnelDTO, String username) {
        Optional<Personnel> existingPersonnel = personnelRepository.findByUsername(username);
        if (existingPersonnel == null) {
            throw new EntityNotFoundException("Personnel with username " + username + " not found");
        }
        Personnel personnel = existingPersonnel.get();

        // Update the fields from updatePersonnelDTO
        personnel.setFirstname(updatePersonnelDTO.getFirstname());
        personnel.setLastname(updatePersonnelDTO.getLastname());
        personnel.setEmail(updatePersonnelDTO.getEmail());
        personnel.setGender(updatePersonnelDTO.getGender());
        personnel.setBirthday(updatePersonnelDTO.getBirthday());
        personnel.setUsername(updatePersonnelDTO.getUsername());

        // Save the updated entity
        return personnelRepository.save(personnel);
    }

    public Personnel changePassword(String username, String newPassword) {
        Optional<Personnel> existingPersonnel = personnelRepository.findByUsername(username);
        Personnel personnel = existingPersonnel.get();
        if (personnel == null) {
            throw new EntityNotFoundException("Personnel with username " + username + " not found");
        }
        System.out.println("*********************************");
        System.out.println(newPassword.password);
        // Encode the new password
        String encodedPassword = new BCryptPasswordEncoder().encode(newPassword);

        // Update the password
        personnel.setPassword(encodedPassword);

        // Save the updated entity
        return personnelRepository.save(personnel);
    }


}