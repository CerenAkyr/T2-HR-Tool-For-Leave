package tr.com.t2.ik;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import tr.com.t2.ik.model.OffDayRequest;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.model.Role;
import tr.com.t2.ik.repository.PersonnelRepository;
import tr.com.t2.ik.repository.RequestRepository;
import tr.com.t2.ik.repository.RoleRepository;

import java.util.*;
import java.text.SimpleDateFormat;


@SpringBootApplication
public class T2IKApplication {

    public static void main(String[] args) {
        SpringApplication.run(T2IKApplication.class, args);
    }

    @Bean
    public CommandLineRunner addTestUsers (PersonnelRepository personnelRepository, RoleRepository roleRepository, RequestRepository offDayRequestRepository) {
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
            mete.setEmail("metehandanaci@t2.com.tr");
            mete.setGender("Erkek");
            String metehanStringStartDate = "2010-07-02";
            Date metehanStartDate = formatter.parse(metehanStringStartDate);
            mete.setStartDate(metehanStartDate);
            String metehanStringBirthday = "1985-06-02";
            Date metehanBirthday = formatter.parse(metehanStringBirthday);
            mete.setBirthday(metehanBirthday);


            Personnel tan = new Personnel();
            tan.setUsername("tan.apaydin");
            tan.setPassword(new BCryptPasswordEncoder().encode("tan"));
            tan.setRoles(new HashSet<>(Collections.singletonList(user)));
            tan.setActivity("Pasif");
            tan.setFirstname("Tan");
            tan.setLastname("Apaydın");
            tan.setEmail("tanapaydin@t2.com.tr");
            tan.setGender("Erkek");
            String tanStringStartDate = "2011-09-16";
            Date tanStartDate = formatter.parse(tanStringStartDate);
            tan.setStartDate(tanStartDate);
            String tanStringBirthday = "1988-12-31";
            Date tanBirthday = formatter.parse(tanStringBirthday);
            tan.setBirthday(tanBirthday);

            Personnel selin = new Personnel();
            selin.setUsername("selin");
            selin.setPassword(new BCryptPasswordEncoder().encode("sel"));
            selin.setRoles(new HashSet<>(Collections.singletonList(user)));
            selin.setActivity("Aktif");
            selin.setFirstname("Selin");
            selin.setLastname("Çabuk");
            selin.setEmail("selincabuk@t2.com.tr");
            selin.setGender("Kadın");
            String selinStringStartDate = "2023-07-10";
            Date selinStartDate = formatter.parse(selinStringStartDate);
            selin.setStartDate(selinStartDate);
            String selinStringBirthday = "2000-05-12";
            Date selinBirthday = formatter.parse(selinStringBirthday);
            selin.setBirthday(selinBirthday);

            Personnel ceren = new Personnel();
            ceren.setUsername("ceren");
            ceren.setPassword(new BCryptPasswordEncoder().encode("cero"));
            ceren.setRoles(new HashSet<>(Collections.singletonList(user)));
            ceren.setActivity("Aktif");
            ceren.setFirstname("Ceren");
            ceren.setLastname("Akyar");
            ceren.setEmail("cerenakyar@t2.com.tr");
            ceren.setGender("Kadın");
            String cerenStringStartDate = "2023-07-10";
            Date cerenStartDate = formatter.parse(cerenStringStartDate);
            ceren.setStartDate(cerenStartDate);
            String cerenStringBirthday = "2002-05-01";
            Date cerenBirthday = formatter.parse(cerenStringBirthday);
            ceren.setBirthday(cerenBirthday);

            personnelRepository.saveAll(Arrays.asList(mete,tan,selin,ceren));

            Optional<Personnel> personnel = personnelRepository.findByUsername("ceren"); // Replace with an actual username
            Personnel existingPers = personnel.get();

            OffDayRequest request1 = new OffDayRequest();

            request1.setPersonnel(existingPers);
            request1.setRequestStatus("Pending");

            Calendar calendar = Calendar.getInstance();
            calendar.set(2023, Calendar.JULY, 31); // Set the year, month, and day for the start date
            request1.setExcuseStartDate(calendar.getTime());

            calendar.set(2023, Calendar.AUGUST, 5); // Set the year, month, and day for the end date
            request1.setExcuseEndDate(calendar.getTime());

            calendar.set(2023, Calendar.JULY, 30); // Set the year, month, and day for the create date
            request1.setExcuseCreateDate(calendar.getTime());

            request1.setExcuseType("Vacation");
            request1.setDescription("Vacation request description.");
            request1.setUpdateDay(new Date());

            // Save request1 to the database
            offDayRequestRepository.save(request1);

        };
    }
}
