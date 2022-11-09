package com.gtbackend.gtbackend.service;

import com.gtbackend.gtbackend.dao.EventRepository;
import com.gtbackend.gtbackend.dao.RsvpRepository;
import com.gtbackend.gtbackend.model.Event;
import com.gtbackend.gtbackend.model.Rsvp;
import com.gtbackend.gtbackend.model.RsvpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON) //ensures singleton
public final class RsvpService {
    private RsvpRepository rsvpRepository;

    @Autowired
    public RsvpService(RsvpRepository rsvpRepository) {
        this.rsvpRepository = rsvpRepository;
    }

    //if multithreading willAttend may run into a race condition
    public void updateWillAttend(long event_id, String email, Event event) throws AccessDeniedException{
        int capacity = event.getCapacity();
        int current = rsvpRepository.getCount(event_id, RsvpStatus.WILLATTEND);
        List<Rsvp> tmp_rsvp = rsvpRepository.getRsvpEmail(event_id,email);
        if(tmp_rsvp.isEmpty() && event.isInviteOnly()){
            throw new AccessDeniedException("Cannot Attend Invite-Only Event without Invite");
        }
        if(current >= capacity){
            throw new IndexOutOfBoundsException();
        }
        if(tmp_rsvp.isEmpty()){
            Rsvp rsvp = new Rsvp(event_id, RsvpStatus.WILLATTEND, email);
            rsvpRepository.save(rsvp);
        }else{
            rsvpRepository.updateStatus(event_id, email, RsvpStatus.WILLATTEND);
        }
    }

}
