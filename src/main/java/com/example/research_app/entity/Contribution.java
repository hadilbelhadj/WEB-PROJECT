package com.example.research_app.entity;

import lombok.Data;
import jakarta.persistence.*;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data
public class Contribution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_contribution;

    @ManyToOne
    @JoinColumn(name = "id_user")
    @JsonIgnoreProperties("contributions") // Empêche la référence circulaire
    private User user;

    @ManyToOne
    @JoinColumn(name = "id_article")
    @JsonIgnoreProperties("contributions") // Si Article a aussi une liste de contributions
    private Article article;

    private String type;
    private Date date;
    private String lieu;
}
