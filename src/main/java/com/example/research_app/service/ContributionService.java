package com.example.research_app.service;

import com.example.research_app.entity.Contribution;
import com.example.research_app.repository.ContributionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // <-- Import à ajouter

import java.util.List;
import java.util.Optional;

@Service
public class ContributionService {
    @Autowired
    private ContributionRepository contributionRepository;

    public Contribution saveContribution(Contribution contribution) {
        return contributionRepository.save(contribution);
    }

    public Optional<Contribution> findContributionById(Long id) {
        return contributionRepository.findById(id);
    }

    @Transactional(readOnly = true) // <-- AJOUTEZ ICI L'ANNOTATION
    public List<Contribution> findAllContributions() {
        return contributionRepository.findAll();
    }

    public void deleteContribution(Long id) {
        contributionRepository.deleteById(id);
    }
}