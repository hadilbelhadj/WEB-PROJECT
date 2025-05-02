package com.example.research_app.controller;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import com.example.research_app.entity.User;
import com.example.research_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//apiuser
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.findUserById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().build(); // 400 si déjà existant
        }
        User savedUser = userService.saveUser(user);
        return ResponseEntity.status(201).body(savedUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        return userService.findUserById(id)
                .map(user -> {
                    user.setNom(userDetails.getNom());
                    user.setEmail(userDetails.getEmail());
                    user.setGrade(userDetails.getGrade());
                    user.setRole(userDetails.getRole());
                    return ResponseEntity.ok(userService.saveUser(user));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
//
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.findUserById(id).isPresent()) {
            userService.deleteUser(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

@GetMapping("/me")
@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
public ResponseEntity<User> getMyProfile(Authentication authentication) {
    String email = authentication.getName(); // username = email ici
    return userService.findByEmail(email)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}

@PutMapping("/me")
@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
public ResponseEntity<User> updateMyProfile(Authentication authentication, @RequestBody User userDetails) {
    String email = authentication.getName();
    return userService.findByEmail(email)
            .map(user -> {
                user.setNom(userDetails.getNom());
                user.setGrade(userDetails.getGrade());
                // NE PAS autoriser modification de l'email ou du rôle ici
                return ResponseEntity.ok(userService.saveUser(user));
            })
            .orElse(ResponseEntity.notFound().build());
}
}