package tr.com.t2.ik.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.t2.ik.model.OffDayRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import tr.com.t2.ik.repository.RequestRepository;



@Service
public class RequestService {

    private final RequestRepository requestRepository;

    @Autowired
    public RequestService(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    public ResponseEntity<?> addOffDays(OffDayRequest offDayRequest) {
        try {
            // Burada iş mantığı ve veritabanı işlemleri

            // Veritabanına kayıt işlemi
            requestRepository.save(offDayRequest);

            // Başarılı yanıt döndür
            return ResponseEntity.ok("İzin isteği başarıyla kaydedildi.");
        } catch (Exception e) {
            // Hata durumunda hata yanıtı döndür
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("İzin isteği kaydedilirken bir hata oluştu.");
        }
    }

    // Diğer iş mantığı ve veritabanı işlemleri için gerekli metotlar

}