package com.gtbackend.gtbackend.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "eventRsvp_table")

public class Rsvp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    private long event_id;
    @NotBlank
    private String status;
    
    @NotBlank 
    private String email;

    public Rsvp(){

    }

    public Rsvp(String status, String email){
        this.status = status;
        this.email = email;
    }

    public Long getEventId(){
        return event_id;
    }

    public void getEvent_id(Long event_id){
        this.event_id = event_id;
    }

    public long getId(){
        return id;
    }

    public String getStatus(){
        return status;
    }

    public void setStatus(String status){
        this.status = status;
    }

    public String getEmail(){
        return status;
    }
    

}
