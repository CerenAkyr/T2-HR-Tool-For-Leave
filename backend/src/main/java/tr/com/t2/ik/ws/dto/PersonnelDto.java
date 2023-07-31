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
public class PersonnelDto {
        private String username;
        private String firstname;
        private String lastname;
        private Date birthday;
        private String activity;
        private String email;
        private String gender;
}
