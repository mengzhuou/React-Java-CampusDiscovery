package com.gtbackend.gtbackend.dao;

import com.gtbackend.gtbackend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    @Query(value = "SELECT e FROM Event e ORDER BY e.id")
    List<Event> findEventByRange();

    @Query(value = "SELECT e FROM Event e Where e.user.email = ?1")
    List<Event> findAllbyUser(String email);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Event e WHERE e.id = ?1 AND e.user.email = ?2")
    void deleteEvent(long id, String email);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Event e WHERE e.user.email = ?1")
    void deleteEventbyEmail(String email);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Event e WHERE e.id = ?1")
    void deleteEventAdmin(long id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Event e SET e.title = ?3 WHERE e.id = ?1 AND e.user.email = ?2")
    void updateTitle(long id, String email, String title);
    @Modifying
    @Transactional
    @Query(value = "UPDATE Event e SET e.title = ?2 WHERE e.id = ?1")
    void updateTitleAdmin(long id, String title);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Event e SET e.user.email = ?2 WHERE e.id = ?1")
    void updateEmailAdmin(long id, String email);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Event e SET e.description = ?3 WHERE e.id = ?1 AND e.user.email = ?2")
    void updateDescription(long id, String email, String description);
    @Modifying
    @Transactional
    @Query(value = "UPDATE Event e SET e.description = ?2 WHERE e.id = ?1")
    void updateDescriptionAdmin(long id, String description);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Event e SET e.location = ?3 WHERE e.id = ?1 AND e.user.email = ?2")
    void updateLocation(long id, String email, String location);
    @Modifying
    @Transactional
    @Query(value = "UPDATE Event e SET e.location = ?2 WHERE e.id = ?1")
    void updateLocationAdmin(long id, String location);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Event e SET e.time = ?3 WHERE e.id = ?1 AND e.user.email = ?2")
    void updateTime(long id, String email, LocalDateTime time);
    @Modifying
    @Transactional
    @Query(value = "UPDATE Event e SET e.time = ?2 WHERE e.id = ?1")
    void updateTimeAdmin(long id, LocalDateTime time);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Event e SET e.capacity = ?3 WHERE e.id = ?1 AND e.user.email = ?2")
    void updateCapacity(long id, String email, int capacity);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Event e SET e.inviteOnly = ?3 WHERE e.id = ?1 AND e.user.email = ?2")
    void updateInvite(long id, String email, boolean inviteOnly);
}
