package com.example.research_app.entity;

import lombok.Data;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Data
public class Contribution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_contribution;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "id_article")
    private Article article;

    private String type; // Par exemple, "conference", "journal", "workshop"
    private Date date;
    private String lieu;
}