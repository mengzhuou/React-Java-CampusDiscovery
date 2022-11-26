package com.gtbackend.gtbackend.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "event_table")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotBlank
    private String title;

    @ManyToOne
    private User user;
    @Lob
    private String description;
    private String location;
    private double longitude;
    private double latitude;
    private LocalDateTime time;
    private int capacity;

    private boolean inviteOnly;

    public Event(){

    }

    public Event(String title, User user, String description, String location, double longitude, double latitude,
                 LocalDateTime time, boolean inviteOnly, int capacity) {
        this.title = title;
        this.user = user;
        this.description = description;
        this.location = location;
        this.longitude = longitude;
        this.latitude = latitude;
        this.time = time;
        this.inviteOnly = inviteOnly;
        this.capacity = capacity;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getEmail() {
        return user.getUsername();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public boolean isInviteOnly() {
        return inviteOnly;
    }

    public void setInviteOnly(boolean inviteOnly) {
        this.inviteOnly = inviteOnly;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public User getUser() {
        return user;
    }

}
