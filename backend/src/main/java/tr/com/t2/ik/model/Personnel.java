package tr.com.t2.ik.model;

import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import java.util.HashSet;
import java.util.Set;
import java.util.Date;

@Data
@Entity
public class Personnel {

    @Id
    @Column
    private String username;

    @Column
    private String password;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "personnel_roles",
            joinColumns = @JoinColumn(name = "username"),
            inverseJoinColumns = @JoinColumn(name = "name")
    )
    private Set<Role> roles = new HashSet<>();

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "birthday")
    private Date birthday;

    @Column(name = "activity", length = 50)
    private String activity;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "email")
    private String email;

    @Column(name = "gender")
    private String gender;

    public void setUsername(String username) {
        this.username = username;
    }
}