package com.example.research_app.entity;

import lombok.Data;
import jakarta.persistence.*;

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
    private List<Contribution> contributions;
}
