package com.gtbackend.gtbackend.dao;

import com.gtbackend.gtbackend.model.Rsvp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Repository

public interface RsvpRepository extends JpaRepository<Rsvp, Integer>{
    @Query(value = "SELECT e FROM Rsvp e WHERE e.email = ?1 ORDER BY e.id")
    List<Rsvp> findRsvpByEmail(String email);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Rsvp e WHERE e.email = ?1")
    void deleteRsvpByEmail(String email);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Rsvp e WHERE e.id = ?1 AND e.email = ?2")
    void deleteRsvp(long id, String email);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Rsvp e SET e.status = ?2 WHERE e.email = ?1")
    void updateStatus(String email, String status);

}
