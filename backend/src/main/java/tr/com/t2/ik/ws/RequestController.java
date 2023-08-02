package tr.com.t2.ik.ws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import tr.com.t2.ik.model.OffDayRequest;
import tr.com.t2.ik.repository.RequestRepository;
import tr.com.t2.ik.security.JwtTokenUtil;
import tr.com.t2.ik.repository.PersonnelRepository;
import tr.com.t2.ik.model.Personnel;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;
import tr.com.t2.ik.ws.dto.RequestDto;




@RestController
@RequestMapping("/api/off")
public class RequestController {

    @Autowired
    private RequestRepository offDayRequestRepository;

    @Autowired
    private PersonnelRepository personnelRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @CrossOrigin
    @PostMapping
    public ResponseEntity<String> addOffRequest(@RequestBody RequestDto offRequest) {
        String username = offRequest.getUsername();
        System.out.println(username);
        Optional<Personnel> optionalPersonnel = personnelRepository.findByUsername(username);


        OffDayRequest receivedOffRequest = new OffDayRequest();

        Instant now = Instant.now();
        receivedOffRequest.setExcuseCreateDate(Date.from(now));

        /*receivedOffRequest.setPersonnel();*/
        receivedOffRequest.setExcuseType(offRequest.getExcuseType());
        receivedOffRequest.setExcuseStartDate(offRequest.getExcuseStartDate());
        receivedOffRequest.setExcuseEndDate(offRequest.getExcuseEndDate());
        receivedOffRequest.setDescription(offRequest.getDescription());
        receivedOffRequest.setPersonnel(optionalPersonnel.get());
        System.out.println("****************************************************");
        System.out.println(offRequest);
        offDayRequestRepository.save(receivedOffRequest);
        if (optionalPersonnel.isPresent()) {
            Personnel personnel = optionalPersonnel.get();
            offRequest.setUsername(username);



            return ResponseEntity.ok("Off request added successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Personnel not found.");
        }
    }
}


/*

@RestController
@RequestMapping("/api/off")
public class RequestController {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @CrossOrigin
    @PostMapping
    public ResponseEntity<String> addOffRequest(@RequestBody OffDayRequest offRequest) {
       */
/* try {
            String token = offRequest.getToken();
            boolean isTokenValid = jwtTokenUtil.validateToken(token);

            if (!isTokenValid) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Geçersiz token");
            }


            OffDayRequest receivedOffRequest = new OffDayRequest();
            receivedOffRequest.setExcuseType(offRequest.getExcuseType());
            receivedOffRequest.setExcuseStartDate(offRequest.getExcuseStartDate());
            receivedOffRequest.setExcuseEndDate(offRequest.getExcuseEndDate());
            receivedOffRequest.setDescription(offRequest.getDescription());

            requestRepository.save(receivedOffRequest); // Veritabanına kayıt işlemi

            return ResponseEntity.ok("İzin isteği başarıyla kaydedildi.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("İzin isteği kaydedilirken bir hata oluştu.");
        }*//*

        return null;
    }
}
*/
