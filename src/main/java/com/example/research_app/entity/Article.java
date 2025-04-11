package com.example.research_app.entity;

import lombok.Data;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
@Data
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String titre;
    private String mots_cles;

    @ManyToOne
    @JoinColumn(name = "domaine_id")
    private Domaine domaine;

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    @JsonIgnore // Empêche la sérialisation des contributions
    private List<Contribution> contributions;
}