package com.gtbackend.gtbackend.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "eventRsvp_table")

public class Rsvp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private Event event;

    private RsvpStatus status;
    
    @NotBlank 
    private String email;

    @Transient
    private boolean conflict;

    public Rsvp(){

    }

    public Rsvp(Event event, RsvpStatus status, String email) {
        this.event = event;
        this.status = status;
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Event getEvent() {
        return event;
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

    public boolean isConflict() {
        return conflict;
    }

    public void setConflict(boolean conflict) {
        this.conflict = conflict;
    }
}
