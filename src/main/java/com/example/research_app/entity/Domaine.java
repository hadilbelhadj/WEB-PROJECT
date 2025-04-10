package com.example.research_app.entity;

import lombok.Data;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Data
public class Domaine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_domaine;
    private String nom_domaine;
    private String type; // Par exemple, "nlp", "image", "cybersécurité"

    @OneToMany(mappedBy = "domaine")
    private List<Article> articles;
}