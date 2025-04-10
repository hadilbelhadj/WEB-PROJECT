package com.example.research_app.controller;

import com.example.research_app.entity.Contribution;
import com.example.research_app.service.ContributionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contributions")
public class ContributionController {
    @Autowired
    private ContributionService contributionService;

    @GetMapping
    public List<Contribution> getAllContributions() {
        return contributionService.findAllContributions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contribution> getContributionById(@PathVariable Long id) {
        return contributionService.findContributionById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Contribution createContribution(@RequestBody Contribution contribution) {
        return contributionService.saveContribution(contribution);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contribution> updateContribution(@PathVariable Long id, @RequestBody Contribution contributionDetails) {
        return contributionService.findContributionById(id)
                .map(contribution -> {
                    contribution.setType(contributionDetails.getType());
                    contribution.setDate(contributionDetails.getDate());
                    contribution.setLieu(contributionDetails.getLieu());
                    contribution.setUser(contributionDetails.getUser());
                    contribution.setArticle(contributionDetails.getArticle());
                    return ResponseEntity.ok(contributionService.saveContribution(contribution));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContribution(@PathVariable Long id) {
        if (contributionService.findContributionById(id).isPresent()) {
            contributionService.deleteContribution(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}