package com.gtbackend.gtbackend.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    private String email;
    @NotBlank
    private String password;
    @NotBlank
    private String fname;
    @NotBlank
    private String lname;
    private Role role;

    public User(){

    }

    public User(String email, String password, String fname, String lname, Role role){
        this.email = email;
        this.password = password;
        this.fname = fname;
        this.lname = lname;
        this.role = role;
    }

    @Override
    public boolean equals(Object obj) {
        User tmp;
        try {
            tmp = (User) obj;
        }catch (ClassCastException e){
            return false;
        }
        if(this.email.equals(tmp.getUsername()) &&
                this.password.equals(tmp.getPassword()) &&
                this.fname.equals(tmp.getFname()) &&
                this.lname.equals(tmp.getLname())){
            return true;
        }
        return false;

    }

    @Override
    public String toString() {
        return "{" +
                "Fname='" + fname + '\'' +
                ", Lname='" + lname + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                '}';
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> "read");
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public String getFname() {
        return fname;
    }
    public String getLname() {
        return lname;
    }

    public Role getRole() {
        return role;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
