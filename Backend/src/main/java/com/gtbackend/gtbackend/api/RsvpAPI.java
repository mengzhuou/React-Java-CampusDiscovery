package com.gtbackend.gtbackend.api;

import com.gtbackend.gtbackend.dao.EventRepository;
import com.gtbackend.gtbackend.dao.RsvpRepository;
import com.gtbackend.gtbackend.model.Event;
import com.gtbackend.gtbackend.model.Rsvp;
import com.gtbackend.gtbackend.model.RsvpStatus;
import com.gtbackend.gtbackend.service.RsvpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
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
    private EventRepository eventRepository;
    private RsvpService rsvpService;

    @Autowired
    public RsvpAPI(RsvpRepository rsvpRepository, EventRepository eventRepository, RsvpService rsvpService){
        this.rsvpRepository = rsvpRepository;
        this.eventRepository = eventRepository;
        this.rsvpService = rsvpService;
    }

    @PatchMapping("/updateRsvp")
    public void updateRsvp(Principal principal, @RequestBody Map<String, String> body) throws NoSuchElementException, IllegalArgumentException, AccessDeniedException {
        RsvpStatus status = RsvpStatus.valueOf(body.get("status").toUpperCase());
        long event_id = Long.valueOf(body.get("event_id"));
        Optional<Event> tmp_event = eventRepository.findById(event_id);
        List<Rsvp> tmp_rsvp = rsvpRepository.getRsvpEmail(event_id, principal.getName());
        if(status.equals(RsvpStatus.INVITED)){
            throw new AccessDeniedException("Cannot Self Invite");
        }
        if(tmp_event.isEmpty()){
            throw new NoSuchElementException();
        }
        if(!tmp_rsvp.isEmpty() && tmp_rsvp.get(0).getStatus().equals(status)){
            return;
        }
        Event event = tmp_event.get();
        if(event.isInviteOnly() && status.equals(RsvpStatus.DELETE)){
            rsvpRepository.updateStatus(event_id, principal.getName(), RsvpStatus.INVITED);
            return;
        }
        if(status.equals(RsvpStatus.DELETE)){
            rsvpRepository.deleteRsvp(event_id, principal.getName());
            return;
        }
        if(status.equals(RsvpStatus.WILLATTEND)){
            rsvpService.updateWillAttend(event_id, principal.getName(), event);
            return;
        }
        if(tmp_rsvp.isEmpty()){
            if(!event.isInviteOnly()){
                addRsvp(event_id, principal.getName(), status);
            }
            return;
        }
        rsvpRepository.updateStatus(event_id, principal.getName(), status);
    }

    public void addRsvp(long event_id, String email, RsvpStatus status){
        Rsvp rsvp = new Rsvp(event_id, status, email);
        rsvpRepository.save(rsvp);
    }

    @GetMapping("/getRsvp")
    @ResponseBody
    public List<Rsvp> getRsvp(@RequestParam String id, @RequestParam String status) throws NoSuchElementException, IllegalArgumentException{
        long event_id = Long.valueOf(id);
        if(eventRepository.findById(event_id).isEmpty()){
            throw new NoSuchElementException();
        }
        if(status.toUpperCase().equals("ALL")){
            return rsvpRepository.getRsvp(event_id);
        }
        RsvpStatus rsvp_status = RsvpStatus.valueOf(status.toUpperCase());
        return rsvpRepository.getRsvpByStatus(event_id, rsvp_status);
    }

    @GetMapping("/getRsvpStatus")
    public String getRsvpStatus(Principal principal, @RequestParam String id) throws NoSuchElementException, IllegalArgumentException{
        long event_id = Long.valueOf(id);
        List<Rsvp> tmp_rsvp = rsvpRepository.getRsvpEmail(event_id, principal.getName());
        if(tmp_rsvp.isEmpty()){
            return "NORSVP";
        }
        return tmp_rsvp.get(0).getStatus().toString();
    }

    @GetMapping("/getCount")
    public Integer getCount(@RequestParam String id) throws NoSuchElementException, IllegalArgumentException{
        long event_id = Long.valueOf(id);
        Optional<Event> event_tmp = eventRepository.findById(event_id);
        if(event_tmp.isEmpty()){
            throw new NoSuchElementException();
        }
        return rsvpRepository.getCount(event_id,RsvpStatus.WILLATTEND);
    }

    @DeleteMapping("/hostRemove")
    public void hostRemove(Principal principal, @RequestParam String id, @RequestParam String email) throws AccessDeniedException {
        long event_id = Long.valueOf(id);
        Optional<Event> tmp_Event = eventRepository.findById(event_id);
        if(tmp_Event.isEmpty()){
            throw new NoSuchElementException();
        }
        Event event = tmp_Event.get();
        if(!event.getEmail().equals(principal.getName())){
            throw new AccessDeniedException("Have to be Event Host");
        }
        rsvpRepository.deleteRsvp(event_id, email);
    }

    @PostMapping("/hostInvite")
    public void hostInvite(Principal principal, @RequestBody Map<String, String> body)throws AccessDeniedException{
        long event_id = Long.valueOf(body.get("event_id"));
        String email = body.get("email");
        Optional<Event> tmp_Event = eventRepository.findById(event_id);
        if(tmp_Event.isEmpty()){
            throw new NoSuchElementException();
        }
        Event event = tmp_Event.get();
        if(!event.getEmail().equals(principal.getName())){
            throw new AccessDeniedException("Have to be Event Host");
        }
        List<Rsvp> tmp_rsvp = rsvpRepository.getRsvpEmail(event_id, email);
        if(tmp_rsvp.isEmpty()){
            Rsvp newRsvp = new Rsvp(event_id, RsvpStatus.INVITED, email);
            rsvpRepository.save((newRsvp));
            return;
        }
    }



}
