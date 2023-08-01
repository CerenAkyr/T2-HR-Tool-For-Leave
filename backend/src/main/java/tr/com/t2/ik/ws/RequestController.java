package tr.com.t2.ik.ws;

import org.springframework.security.authentication.AuthenticationManager;
import tr.com.t2.ik.model.OffDayRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tr.com.t2.ik.repository.RequestRepository;
import tr.com.t2.ik.security.JwtTokenUtil;




@RestController

@RequestMapping("/api/add-off-days")
public class RequestController {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @CrossOrigin
    @PostMapping
    public ResponseEntity<?> addOffDays(@RequestBody OffDayRequest offDayRequest) {
        try {
            // Burada veritabanına kaydetme işlemi
            // İlgili entity sınıfınızın (ExcuseLeave) veritabanına kaydeden bir repository (excuseLeaveRepository) kullanılmalıdır.
            // Örnek olarak:


            OffDayRequest receivedOffDayRequest = new OffDayRequest();
            receivedOffDayRequest.setRequestId(offDayRequest.getRequestId());
            receivedOffDayRequest.setRequestStatus(offDayRequest.getRequestStatus());
            receivedOffDayRequest.setExcuseCreateDate(offDayRequest.getExcuseCreateDate());
            receivedOffDayRequest.setExcuseStartDate(offDayRequest.getExcuseStartDate());
            receivedOffDayRequest.setExcuseEndDate(offDayRequest.getExcuseEndDate());
            receivedOffDayRequest.setExcuseType(offDayRequest.getExcuseType());
            receivedOffDayRequest.setDescription(offDayRequest.getDescription());
            receivedOffDayRequest.setApprovedBy(offDayRequest.getApprovedBy());
            receivedOffDayRequest.setUpdatedBy(offDayRequest.getUpdatedBy());
            receivedOffDayRequest.setUpdateDay(offDayRequest.getUpdateDay());

            // Veritabanına kayıt işlemi
            requestRepository.save(receivedOffDayRequest);

            // Başarılı yanıt döndür
            return ResponseEntity.ok("İzin isteği başarıyla kaydedildi.");
        } catch (Exception e) {
            // Hata durumunda hata yanıtı döndür
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("İzin isteği kaydedilirken bir hata oluştu.");
        }
    }
}
