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
public class RequestDto {
    private String username;
    private Date excuseStartDate;
    private Date excuseEndDate;
    private String excuseType;
    private String description;
    private Long requestId;
    private String firstname;
    private String lastname;
    private String email;
    private String requestStatus;

}
