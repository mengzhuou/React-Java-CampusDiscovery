package com.gtbackend.gtbackend.dao;

import com.gtbackend.gtbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
