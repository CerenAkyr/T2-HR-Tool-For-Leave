package com.t2software.demo.repository;

import com.t2software.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<User, Integer> {
    //Optional<User> findByLoginAndPassword(String login, String password);

}
