
package com.example.research_app.service;

import com.example.research_app.entity.Role;
import com.example.research_app.entity.User;
import com.example.research_app.repository.RoleRepository;
import com.example.research_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User registerNewUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role contributorRole = roleRepository.findByRole("CONTRIBUTOR")
        .orElseThrow(() -> new RuntimeException("Default role not found"));

            .orElseThrow(() -> new RuntimeException("Default role not found"));
        user.setRole(contributorRole);

        return userRepository.save(user);
    }

    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}