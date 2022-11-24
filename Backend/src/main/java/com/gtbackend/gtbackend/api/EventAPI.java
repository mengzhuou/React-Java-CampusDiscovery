package com.gtbackend.gtbackend.api;

import com.gtbackend.gtbackend.dao.EventRepository;
import com.gtbackend.gtbackend.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.*;

@RestController
@RequestMapping("/api/v1")
public class EventAPI {
    private final EventRepository eventRepository;

    @Autowired
    public EventAPI(EventRepository eventRepository){
        this.eventRepository = eventRepository;
    }

    @PostMapping("/addEvent")
    public void addEvent(Principal principal, @RequestBody Map<String, String> body) throws IllegalArgumentException, DateTimeParseException {
        Event event = new Event(body.get("title"), principal.getName(),
                body.get("description"), body.get("location"), Double.parseDouble(body.get("longitude")),
                Double .parseDouble(body.get("latitude")), LocalDateTime.parse(body.get("time")),
                Boolean.parseBoolean(body.get("invite")), Integer.parseInt(body.get("capacity")));
        eventRepository.save(event);
    }

    @GetMapping("/getEvent")
    @ResponseBody
    public List<Event> getEvent(@RequestParam String page,
                                     @RequestParam String dateAfter,
                                     @RequestParam String dateBefore,
                                     @RequestParam String latitude,
                                     @RequestParam String longitude,
                                     @RequestParam String miles,
                                     @RequestParam String host) throws IllegalArgumentException{
        int page_num = Integer.parseInt(page);
        LocalDateTime dateA = null;
        LocalDateTime dateB = null;
        if(!dateAfter.equals("none")){
            dateA = LocalDateTime.parse(dateAfter);
        }
        if(!dateBefore.equals("none")){
            dateB = LocalDateTime.parse(dateBefore);
        }
        double lng = Double.parseDouble(longitude);
        double lat = Double.parseDouble(latitude);
        Double mi = null;
        if(!miles.equals("")){
            mi = Double.valueOf(miles);
        }
        if(page_num < 1){
            throw new IllegalArgumentException();
        }
        List<Event> list =  eventRepository.findEventByRange();
        List<Event> ret = new ArrayList<>();
        for(Event e : list){
            if(dateA != null && e.getTime().compareTo(dateA) < 0){
                continue;
            }
            if(dateB != null && e.getTime().compareTo(dateB) > 0){
                continue;
            }
            if(mi != null && distanceTo(lat, lng, e.getLatitude(), e.getLongitude()) > mi){
                continue;
            }
            if(!host.equals("") && !e.getEmail().contains(host)){
                continue;
            }
            ret.add(e);
        }
        int start = (page_num-1)*10;
        int end = Math.min(start + 9, ret.size() - 1);
        if(start <= ret.size()-1){
            return ret.subList(start,end+1);
        }
        return new ArrayList<>();

    }
    public double distanceTo(double lat1, double lon1, double lat2, double lon2) {
        double STATUTE_MILES_PER_NAUTICAL_MILE = 1.15077945;
        lat1 = Math.toRadians(lat1);
        lon1 = Math.toRadians(lon1);
        lat2 = Math.toRadians(lat2);
        lon2 = Math.toRadians(lon2);

        // great circle distance in radians, using law of cosines formula
        double angle = Math.acos(Math.sin(lat1) * Math.sin(lat2)
                + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));

        // each degree on a great circle of Earth is 60 nautical miles
        double nauticalMiles = 60 * Math.toDegrees(angle);
        return STATUTE_MILES_PER_NAUTICAL_MILE * nauticalMiles;
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
        long Event_id = Long.parseLong(id);
        eventRepository.deleteEvent(Event_id, principal.getName());
    }

    @PatchMapping("/updateTitle")
    public void updateTitle(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        long id = Long.parseLong(body.get("id"));
        String title = body.get("title");
        eventRepository.updateTitle(id,principal.getName(),title);
    }
    @PatchMapping("/updateDescription")
    public void updateDescription(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        long id = Long.parseLong(body.get("id"));
        String description = body.get("description");
        eventRepository.updateDescription(id,principal.getName(),description);
    }
    @PatchMapping("/updateLocation")
    public void updateLocation(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        long id = Long.parseLong(body.get("id"));
        String location = body.get("location");
        eventRepository.updateLocation(id,principal.getName(),location);
    }
    @PatchMapping("/updateTime")
    public void updateTime(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        long id = Long.parseLong(body.get("id"));
        String time = body.get("time");
        eventRepository.updateTime(id,principal.getName(),time);
    }
    @PatchMapping("/updateCapacity")
    public void updateCapacity(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        long id = Long.parseLong(body.get("id"));
        int capacity = Integer.parseInt(body.get("capacity"));
        eventRepository.updateCapacity(id,principal.getName(),capacity);
    }
    @PatchMapping("/updateInvite")
    public void updateInvite(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        long id = Long.parseLong(body.get("id"));
        String InviteStatus = body.get("invite");
        if(InviteStatus.equalsIgnoreCase("TRUE")){
            eventRepository.updateInvite(id,principal.getName(),true);
            return;
        }
        eventRepository.updateInvite(id,principal.getName(),false);
    }
}
