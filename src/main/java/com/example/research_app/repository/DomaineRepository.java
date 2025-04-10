package com.example.research_app.repository;

import com.example.research_app.entity.Domaine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DomaineRepository extends JpaRepository<Domaine, Long> {
}