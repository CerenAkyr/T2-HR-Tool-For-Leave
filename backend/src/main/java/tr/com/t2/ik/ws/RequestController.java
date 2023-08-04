package tr.com.t2.ik.ws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.web.bind.annotation.*;
import tr.com.t2.ik.model.OffDayRequest;
import tr.com.t2.ik.repository.RequestRepository;
import tr.com.t2.ik.security.JwtTokenUtil;
import tr.com.t2.ik.repository.PersonnelRepository;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.security.service.RequestService;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;


import tr.com.t2.ik.security.service.RequestService;
import tr.com.t2.ik.ws.dto.RequestCalendarDTO;
import tr.com.t2.ik.ws.dto.RequestDto;

import java.util.stream.Collectors;

import tr.com.t2.ik.security.service.T2UserDetailsService;
import tr.com.t2.ik.ws.dto.PersonnelDto;
import tr.com.t2.ik.ws.dto.RequestDto;
import org.modelmapper.ModelMapper;


@CrossOrigin
@RestController
@RequestMapping
public class RequestController {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private PersonnelRepository personnelRepository;

    @Autowired
    private RequestService requestService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

/*    @Autowired
    private ModelMapper modelMapper;*/

    @CrossOrigin
    @PostMapping("/api/off")
    public ResponseEntity<String> addOffRequest(@RequestBody RequestDto offRequest) {


        String username = offRequest.getUsername();
        System.out.println(username);
        Optional<Personnel> optionalPersonnel = personnelRepository.findByUsername(username);

        OffDayRequest receivedOffRequest = new OffDayRequest();

        Instant now = Instant.now();
        receivedOffRequest.setExcuseCreateDate(Date.from(now));
        receivedOffRequest.setRequestStatus("Pending");

        receivedOffRequest.setExcuseType(offRequest.getExcuseType());
        receivedOffRequest.setExcuseStartDate(offRequest.getExcuseStartDate());
        receivedOffRequest.setExcuseEndDate(offRequest.getExcuseEndDate());
        receivedOffRequest.setDescription(offRequest.getDescription());
        receivedOffRequest.setPersonnel(optionalPersonnel.get());
        System.out.println("****************************************************");
        System.out.println(offRequest);
        requestRepository.save(receivedOffRequest);
        if (optionalPersonnel.isPresent()) {
            Personnel personnel = optionalPersonnel.get();
            offRequest.setUsername(username);


            return ResponseEntity.ok("Off request added successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Personnel not found.");
        }



    }

    @Autowired
    public RequestController(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }
    @CrossOrigin
    @GetMapping("/api/pendingrequests")
    public List<OffDayRequest> getPendingRequests() {
        List<OffDayRequest> pendingRequests = requestRepository.findByRequestStatus("Pending");
        return pendingRequests;
    }

    @GetMapping("/calendar/info")
    @CrossOrigin
    public List<RequestCalendarDTO> getAllRequests() {
        return requestService.getAllRequeststoCalendar();
    }
}





