package com.gtbackend.gtbackend.api;

import com.gtbackend.gtbackend.dao.EventRepository;
import com.gtbackend.gtbackend.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

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

    @DeleteMapping("/removeEvent")
    public void removeEvent(Principal principal, @RequestParam String id) throws NumberFormatException{
        Integer Event_id = Integer.valueOf(id);

        eventRepository.deleteEvent(Event_id, principal.getName());
    }

    @PatchMapping("/updateTitle")
    public void updateTitle(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        Integer id = Integer.valueOf(body.get("id"));
        String title = body.get("title");
        eventRepository.updateTitle(id,principal.getName(),title);
    }
    @PatchMapping("/updateDescription")
    public void updateDescription(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        Integer id = Integer.valueOf(body.get("id"));
        String description = body.get("description");
        eventRepository.updateDescription(id,principal.getName(),description);
    }
    @PatchMapping("/updateLocation")
    public void updateLocation(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        Integer id = Integer.valueOf(body.get("id"));
        String location = body.get("location");
        eventRepository.updateLocation(id,principal.getName(),location);
    }
    @PatchMapping("/updateTime")
    public void updateTime(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        Integer id = Integer.valueOf(body.get("id"));
        String time = body.get("time");
        eventRepository.updateTime(id,principal.getName(),time);
    }
}
