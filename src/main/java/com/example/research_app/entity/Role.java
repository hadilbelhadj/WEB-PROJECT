package com.example.research_app.entity;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String role; // Par exemple, "ADMIN", "MODERATOR", "USER"
}