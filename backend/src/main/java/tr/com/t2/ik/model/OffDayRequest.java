package tr.com.t2.ik.model;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

@Data
@Entity
public class OffDayRequest {

    @Id
    @Column
    private String requestId;

    @ManyToOne
    @JoinColumn(name = "username")
    private Personnel personnel;

    @Column
    private String requestStatus;

    @Column(name = "excuse_start_day")
    private Date excuseStartDate;

    @Column(name = "excuse_end_day")
    private Date excuseEndDate;

    @Column(name = "excuse_create_day")
    private Date excuseCreateDate;


    @Column(name = "excuse_type")
    private String excuseType;

    @Column(name = "description")
    private String description;

    @Column(name = "update_date")
    private Date updateDay;

    @Column (name = "approved_By")
    private String approvedBy;

    @Column (name = "updated_By")
    private String updatedBy;

    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }














}
