package tr.com.t2.ik.ws.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tr.com.t2.ik.model.Personnel;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestCalendarDTO {
    private Personnel personnel;
    private Date startDate;
    private Date endDate;
}
