package com.example.research_app.service;

import com.example.research_app.entity.Article;
import com.example.research_app.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {
    @Autowired
    private ArticleRepository articleRepository;

    public Article saveArticle(Article article) {
        return articleRepository.save(article);
    }

    public Optional<Article> findArticleById(Long id) {
        return articleRepository.findById(id);
    }

    public List<Article> findAllArticles() {
        return articleRepository.findAll();
    }

    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }
}