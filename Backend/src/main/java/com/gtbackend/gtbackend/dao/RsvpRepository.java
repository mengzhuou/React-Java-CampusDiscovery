package com.gtbackend.gtbackend.dao;

import com.gtbackend.gtbackend.model.Rsvp;
import com.gtbackend.gtbackend.model.RsvpStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository

public interface RsvpRepository extends JpaRepository<Rsvp, Long>{


    @Query(value = "SELECT COUNT(e) FROM Rsvp e WHERE e.event.id = ?1 AND e.status = ?2")
    int getCount(long event_id, RsvpStatus status);

    @Query(value = "SELECT e FROM Rsvp e WHERE e.event.id = ?1")
    List<Rsvp> getRsvp(long event_id);

    @Query(value = "SELECT e FROM Rsvp e WHERE e.event.id = ?1 AND e.status = ?2")
    List<Rsvp> getRsvpByStatus(long event_id, RsvpStatus status);

    @Query(value = "SELECT e FROM Rsvp e WHERE e.event.id = ?1 AND e.email = ?2")
    List<Rsvp> getRsvpEmail(long event_id, String email);

    @Query(value = "SELECT e FROM Rsvp e WHERE e.email = ?1")
    List<Rsvp> getAllRsvpEmail(String email);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Rsvp e WHERE e.event.id = ?1 AND e.email = ?2")
    void deleteRsvp(long event_id, String email);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Rsvp e WHERE e.event.id = ?1")
    void deleteAllRsvp(long event_id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Rsvp e SET e.status = ?3 WHERE e.event.id = ?1 AND e.email = ?2")
    void updateStatus(long event_id, String email, RsvpStatus status);

}
