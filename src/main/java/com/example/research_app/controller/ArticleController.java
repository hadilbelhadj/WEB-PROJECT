package com.example.research_app.controller;

import com.example.research_app.entity.Article;
import com.example.research_app.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @GetMapping
    public List<Article> getAllArticles() {
        return articleService.findAllArticles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable Long id) {
        return articleService.findArticleById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
@PreAuthorize("hasAnyRole('CONTRIBUTOR', 'ADMIN')")
    @PostMapping
    public Article createArticle(@RequestBody Article article) {
        return articleService.saveArticle(article);
    }
@PreAuthorize("hasAnyRole('CONTRIBUTOR', 'ADMIN')")
    @PatchMapping("/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable Long id, @RequestBody Article articleDetails) {
        return articleService.findArticleById(id)
                .map(article -> {
                    if (articleDetails.getTitre() != null) {
                        article.setTitre(articleDetails.getTitre());
                    }
                    if (articleDetails.getMots_cles() != null) {
                        article.setMots_cles(articleDetails.getMots_cles());
                    }
                    if (articleDetails.getDomaine() != null) {
                        article.setDomaine(articleDetails.getDomaine());
                    }
                    return ResponseEntity.ok(articleService.saveArticle(article));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
@PreAuthorize("hasAnyRole('CONTRIBUTOR', 'ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        if (articleService.findArticleById(id).isPresent()) {
            articleService.deleteArticle(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}