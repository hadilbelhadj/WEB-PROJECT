package com.example.research_app.controller;

import com.example.research_app.entity.Domaine;
import com.example.research_app.service.DomaineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/domaines")
public class DomaineController {
    @Autowired
    private DomaineService domaineService;

    @GetMapping
    public List<Domaine> getAllDomaines() {
        return domaineService.findAllDomaines();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Domaine> getDomaineById(@PathVariable Long id) {
        return domaineService.findDomaineById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Domaine createDomaine(@RequestBody Domaine domaine) {
        return domaineService.saveDomaine(domaine);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Domaine> updateDomaine(@PathVariable Long id, @RequestBody Domaine domaineDetails) {
        return domaineService.findDomaineById(id)
                .map(domaine -> {
                    domaine.setNom_domaine(domaineDetails.getNom_domaine());
                    domaine.setType(domaineDetails.getType());
                    return ResponseEntity.ok(domaineService.saveDomaine(domaine));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDomaine(@PathVariable Long id) {
        if (domaineService.findDomaineById(id).isPresent()) {
            domaineService.deleteDomaine(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}