package tr.com.t2.ik;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.model.Role;
import tr.com.t2.ik.repository.PersonnelRepository;
import tr.com.t2.ik.repository.RoleRepository;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Date;
import java.text.SimpleDateFormat;


@SpringBootApplication
public class T2IKApplication {

    public static void main(String[] args) {
        SpringApplication.run(T2IKApplication.class, args);
    }

    @Bean
    public CommandLineRunner addTestUsers (PersonnelRepository personnelRepository, RoleRepository roleRepository) {
        return (args) -> {

            Role admin = new Role();
            admin.setName("ROLE_ADMIN");

            Role user = new Role();
            user.setName("ROLE_USER");

            roleRepository.saveAll(Arrays.asList(admin,user));
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

            Personnel mete = new Personnel();
            mete.setUsername("metehan.danaci");
            mete.setPassword(new BCryptPasswordEncoder().encode("mete"));
            mete.setRoles(new HashSet<>(Arrays.asList(admin, user)));
            mete.setActivity("Aktif");
            mete.setFirstname("Metehan");
            mete.setLastname("Danacı");
            String metehanStringBirthday = "1984-06-02";
            Date metehanBirthday = formatter.parse(metehanStringBirthday);
            mete.setBirthday(metehanBirthday);
            String metehanStringStartDate = "2010-07-02";
            Date metehanStartDate = formatter.parse(metehanStringStartDate);
            mete.setStartDate(metehanStartDate);


            Personnel tan = new Personnel();
            tan.setUsername("tan.apaydin");
            tan.setPassword(new BCryptPasswordEncoder().encode("tan"));
            tan.setRoles(new HashSet<>(Collections.singletonList(user)));
            tan.setActivity("Pasif");
            tan.setFirstname("Tan");
            tan.setLastname("Apaydın");
            String tanStringBirthday = "1987-12-31";
            Date tanBirthday = formatter.parse(tanStringBirthday);
            tan.setBirthday(tanBirthday);
            String tanStringStartDate = "2011-12-01";
            Date tanStartDate = formatter.parse(tanStringStartDate);
            tan.setStartDate(tanStartDate);

            Personnel selin = new Personnel();
            selin.setUsername("selin");
            selin.setPassword(new BCryptPasswordEncoder().encode("sel"));
            selin.setRoles(new HashSet<>(Collections.singletonList(user)));
            selin.setActivity("Aktif");
            selin.setFirstname("Selin");
            selin.setLastname("Çabuk");
            String selinStringBirthday = "2000-05-12";
            Date selinBirthday = formatter.parse(selinStringBirthday);
            selin.setBirthday(selinBirthday);
            String selinStringStartDate = "2023-07-10";
            Date selinStartDate = formatter.parse(selinStringStartDate);
            selin.setStartDate(selinStartDate);


            Personnel ceren = new Personnel();
            ceren.setUsername("ceren");
            ceren.setPassword(new BCryptPasswordEncoder().encode("cero"));
            ceren.setRoles(new HashSet<>(Collections.singletonList(user)));
            ceren.setActivity("Aktif");
            ceren.setFirstname("Ceren");
            ceren.setLastname("Akyar");
            String cerenStringBirthday = "2002-05-01";
            Date cerenBirthday = formatter.parse(cerenStringBirthday);
            ceren.setBirthday(cerenBirthday);
            String cerenStringStartDate = "2023-07-10";
            Date cerenStartDate = formatter.parse(cerenStringStartDate);
            ceren.setStartDate(cerenStartDate);

            personnelRepository.saveAll(Arrays.asList(mete,tan,selin,ceren));
        };
    }
}
