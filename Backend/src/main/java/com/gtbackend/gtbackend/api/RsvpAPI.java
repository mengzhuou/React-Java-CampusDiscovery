package com.gtbackend.gtbackend.api;

import com.gtbackend.gtbackend.dao.RsvpRepository;
import com.gtbackend.gtbackend.model.Rsvp;
import com.gtbackend.gtbackend.model.RsvpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")

public class RsvpAPI {
    private RsvpRepository rsvpRepository;

    @Autowired
    public RsvpAPI(RsvpRepository rsvpRepository){
        this.rsvpRepository = rsvpRepository;
    }

    @PostMapping("/addRsvp")
    public void addRsvp(Principal principal, @RequestBody Map<String, String> body) throws IllegalArgumentException{
        long event_id = Long.valueOf(body.get("event_id"));
        RsvpStatus status = RsvpStatus.valueOf(body.get("status").toUpperCase());
        Rsvp rsvp = new Rsvp(event_id, status, principal.getName());
        rsvpRepository.save(rsvp);
    }

    @GetMapping("/getInvited")
    @ResponseBody
    public List<Rsvp> getInvited(@RequestParam String email) throws IllegalArgumentException{
        return rsvpRepository.getInvited(email, RsvpStatus.INVITED);
    }

    @GetMapping("/getRsvp")
    @ResponseBody
    public Rsvp getRsvp(@RequestParam String id) throws NoSuchElementException, IllegalArgumentException{
        long rsvp_id = Long.valueOf(id);
        Optional<Rsvp> ret = rsvpRepository.findById(rsvp_id);
        if(ret.isEmpty()){
            throw new NoSuchElementException();
        }
        return ret.get();
    }

    @DeleteMapping("/removeRsvpEmail")
    public void removeRsvpByEmail(Principal principal){
        rsvpRepository.deleteRsvpByEmail(principal.getName());
    }

    @DeleteMapping("/removeRsvp")
    public void removeRsvp(Principal principal, @RequestParam String id) throws NumberFormatException{
        Long rsvp_id = Long.valueOf(id);
        rsvpRepository.deleteRsvp(rsvp_id, principal.getName());
    }
 
    @PatchMapping("/updateStatus")
    public void updateStatus(Principal principal, @RequestBody Map<String, String> body) throws IllegalArgumentException{
        RsvpStatus status = RsvpStatus.valueOf(body.get("status").toUpperCase());
        rsvpRepository.updateStatus(principal.getName(), status);
    }
}
