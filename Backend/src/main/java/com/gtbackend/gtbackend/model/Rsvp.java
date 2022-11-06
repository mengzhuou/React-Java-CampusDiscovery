package com.gtbackend.gtbackend.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "eventRsvp_table")

public class Rsvp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long event_id;

    private RsvpStatus status;
    
    @NotBlank 
    private String email;

    public Rsvp(){

    }

    public Rsvp(long event_id, RsvpStatus status, String email) {
        this.id = id;
        this.event_id = event_id;
        this.status = status;
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getEvent_id() {
        return event_id;
    }

    public void setEvent_id(long event_id) {
        this.event_id = event_id;
    }

    public RsvpStatus getStatus() {
        return status;
    }

    public void setStatus(RsvpStatus status) {
        this.status = status;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
