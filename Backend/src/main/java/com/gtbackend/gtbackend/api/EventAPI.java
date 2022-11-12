package com.gtbackend.gtbackend.api;

import com.gtbackend.gtbackend.dao.EventRepository;
import com.gtbackend.gtbackend.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class EventAPI {
    private EventRepository eventRepository;

    @Autowired
    public EventAPI(EventRepository eventRepository){
        this.eventRepository = eventRepository;
    }

    @PostMapping("/addEvent")
    public void addEvent(Principal principal, @RequestBody Map<String, String> body) throws IllegalArgumentException{
        Event event = new Event(body.get("title"), principal.getName(),
                body.get("description"), body.get("location"), body.get("time"));
        eventRepository.save(event);
    }

    @GetMapping("/getEvent")
    @ResponseBody
    public List<Event> findIdByRange(@RequestParam String page) throws IllegalArgumentException{
        Integer page_num = Integer.valueOf(page);
        if(page_num < 1){
            throw new IllegalArgumentException();
        }
        return eventRepository.findEventByRange(PageRequest.of(page_num-1,10));
    }

    @GetMapping("/getEventById")
    @ResponseBody
    public Event findEvent(@RequestParam String id) throws IllegalArgumentException, NoSuchElementException{
        Long event_id = Long.valueOf(id);
        Optional<Event> tmpEvent = eventRepository.findById(event_id);
        if(tmpEvent.isEmpty()){
            throw new NoSuchElementException();
        }
        return tmpEvent.get();
    }

    @GetMapping("/getEventSize")
    public long getSize(){
        return eventRepository.count();
    }

    @DeleteMapping("/removeEvent")
    public void removeEvent(Principal principal, @RequestParam String id) throws NumberFormatException{
        Long Event_id = Long.valueOf(id);
        eventRepository.deleteEvent(Event_id, principal.getName());
    }

    @PatchMapping("/updateTitle")
    public void updateTitle(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        Long id = Long.valueOf(body.get("id"));
        String title = body.get("title");
        eventRepository.updateTitle(id,principal.getName(),title);
    }
    @PatchMapping("/updateDescription")
    public void updateDescription(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        Long id = Long.valueOf(body.get("id"));
        String description = body.get("description");
        eventRepository.updateDescription(id,principal.getName(),description);
    }
    @PatchMapping("/updateLocation")
    public void updateLocation(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        Long id = Long.valueOf(body.get("id"));
        String location = body.get("location");
        eventRepository.updateLocation(id,principal.getName(),location);
    }
    @PatchMapping("/updateTime")
    public void updateTime(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        Long id = Long.valueOf(body.get("id"));
        String time = body.get("time");
        eventRepository.updateTime(id,principal.getName(),time);
    }
    @PatchMapping("/updateCapacity")
    public void updateCapacity(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        Long id = Long.valueOf(body.get("id"));
        Integer capacity = Integer.valueOf(body.get("capacity"));
        eventRepository.updateCapacity(id,principal.getName(),capacity);
    }
    @PatchMapping("/updateInvite")
    public void updateInvite(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        Long id = Long.valueOf(body.get("id"));
        String InviteStatus = body.get("invite");
        if(InviteStatus.toUpperCase().equals("TRUE")){
            eventRepository.updateInvite(id,principal.getName(),true);
            return;
        }
        eventRepository.updateInvite(id,principal.getName(),false);
    }
}
