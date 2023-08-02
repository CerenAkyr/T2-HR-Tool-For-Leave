package tr.com.t2.ik.ws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import tr.com.t2.ik.model.OffDayRequest;
import tr.com.t2.ik.repository.RequestRepository;
import tr.com.t2.ik.security.JwtTokenUtil;

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
        }*/
        return null;
    }
}
