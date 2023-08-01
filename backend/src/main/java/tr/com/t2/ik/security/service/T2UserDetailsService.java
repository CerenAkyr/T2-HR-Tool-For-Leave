package tr.com.t2.ik.security.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import tr.com.t2.ik.mapper.AutoPersonnelMapper;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.repository.PersonnelRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import tr.com.t2.ik.ws.dto.PersonnelDto;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class T2UserDetailsService implements UserDetailsService {

    private PersonnelRepository personnelRepository;



    public T2UserDetailsService(PersonnelRepository personnelRepository) {
        this.personnelRepository = personnelRepository;
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
        //Optional<Personnel> userOptional = personnelRepository.findByUsername(username);

        return userOptional.map(user -> AutoPersonnelMapper.MAPPER.mapToPersonnelDto(user)).orElse(null);
    }
}




