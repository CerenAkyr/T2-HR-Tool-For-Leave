package tr.com.t2.ik.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tr.com.t2.ik.mapper.AutoRequestMapper;

import tr.com.t2.ik.mapper.AutoPersonnelMapper;

import tr.com.t2.ik.model.OffDayRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.repository.RequestRepository;
import tr.com.t2.ik.ws.dto.PersonnelDto;

import tr.com.t2.ik.ws.dto.RequestCalendarDTO;

import tr.com.t2.ik.ws.dto.RequestDto;


import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Service
public class RequestService {

    private final RequestRepository requestRepository;

    @Autowired
    public RequestService(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }
/*
    public ResponseEntity<?> addOffDays(OffDayRequest offDayRequest) {
        try {

            requestRepository.save(offDayRequest);

            // Başarılı yanıt döndür
            return ResponseEntity.ok("İzin isteği başarıyla kaydedildi.");
        } catch (Exception e) {
            // Hata durumunda hata yanıtı döndür
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("İzin isteği kaydedilirken bir hata oluştu.");
        }
    }

    public Iterable<OffDayRequest> getAllRequests() {
        Iterable<OffDayRequest> requests = requestRepository.findAll();
        return  requests; // Convert Iterable to Stream


    }

    // Diğer iş mantığı ve veritabanı işlemleri için gerekli metotlar


    public List<RequestCalendarDTO> getAllRequests() {
        List<OffDayRequest> requests = requestRepository.findAll();
        return StreamSupport.stream(requests.spliterator(), false) // Convert Iterable to Stream
                .map(request -> AutoRequestMapper.MAPPER.mapToRequestCalendarDto(request))
                .collect(Collectors.toList());
    }*/

    public List<RequestCalendarDTO> getAllRequeststoCalendar() {
        List<OffDayRequest> requests = requestRepository.findAll();
        return StreamSupport.stream(requests.spliterator(), false)
                .map(request -> AutoRequestMapper.MAPPER.mapToRequestCalendarDto(request))
                .collect(Collectors.toList());
    }

    public List<OffDayRequest> getAllRequests() {
        List<OffDayRequest> requests = requestRepository.findAll();
        return requests;
    }


}