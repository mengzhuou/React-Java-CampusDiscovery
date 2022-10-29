package com.gtbackend.gtbackend.api;

import com.gtbackend.gtbackend.dao.EventRepository;
import com.gtbackend.gtbackend.model.Event;
import com.gtbackend.gtbackend.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Event> findIdByRange(@RequestParam String page) throws NumberFormatException{
        Integer page_num = Integer.valueOf(page);

        return eventRepository.findEventByIdRange(10*(page_num-1)+1,10*page_num);
    }
}
