package tr.com.t2.ik.ws.dto;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@Data
public class NewPersonnelDTO {
    private String username;
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private String gender;
    private Date birthday;
}

