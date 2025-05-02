package com.example.research_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
@EnableMethodSecurity(prePostEnabled = true)
@SpringBootApplication
public class ResearchAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(ResearchAppApplication.class, args);
    }
}



