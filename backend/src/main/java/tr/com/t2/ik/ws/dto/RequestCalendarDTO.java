package tr.com.t2.ik.ws.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestCalendarDTO {
    private String username;
    private String firstname;
    private String lastname;
    private Date startDate;
    private Date endDate;
}
