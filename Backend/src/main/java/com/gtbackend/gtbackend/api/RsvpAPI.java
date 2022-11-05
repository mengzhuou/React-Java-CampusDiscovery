package com.gtbackend.gtbackend.api;

import com.gtbackend.gtbackend.dao.RsvpRepository;
import com.gtbackend.gtbackend.model.Rsvp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

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
        Rsvp rsvp = new Rsvp(principal.getName(), body.get("status"));
        rsvpRepository.save(rsvp);
    }

    @GetMapping("/getRsvp")
    @ResponseBody
    public List<Rsvp> findRsvpByEmail(@RequestParam String email) throws IllegalArgumentException{
        return rsvpRepository.findRsvpByEmail(email);
    }

    @DeleteMapping("/removeRsvp")
    public void removeRsvpByEmail(Principal principal, @RequestParam String email) throws NumberFormatException{
        rsvpRepository.deleteRsvpByEmail(principal.getName());
    }

    @DeleteMapping("/removeRsvp")
    public void removeRsvp(Principal principal, @RequestParam String id) throws NumberFormatException{
        Long rsvp_id = Long.valueOf(id);
        rsvpRepository.deleteRsvp(rsvp_id, principal.getName());
    }
 
    @PatchMapping("/updateStatus")
    public void updateStatus(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        String status = body.get("status");
        rsvpRepository.updateStatus(principal.getName(), status);
    }
}
