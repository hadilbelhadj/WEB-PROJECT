package com.example.research_app.service;

import com.example.research_app.entity.Domaine;
import com.example.research_app.repository.DomaineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DomaineService {
    @Autowired
    private DomaineRepository domaineRepository;

    public Domaine saveDomaine(Domaine domaine) {
        return domaineRepository.save(domaine);
    }

    public Optional<Domaine> findDomaineById(Long id) {
        return domaineRepository.findById(id);
    }

    public List<Domaine> findAllDomaines() {
        return domaineRepository.findAll();
    }

    public void deleteDomaine(Long id) {
        domaineRepository.deleteById(id);
    }
}