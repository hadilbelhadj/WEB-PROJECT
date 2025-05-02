import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, NavigationExtras } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../../services/auth.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./sign-in.component.html", // nom du fichier HTML correspondant
})
export class LoginComponent {
  email = "";
  password = "";
  errorMessage = "";
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = "Veuillez remplir tous les champs";
      return;
    }

    this.isLoading = true;
    this.errorMessage = "";
    console.log("Tentative de connexion avec email:", this.email);

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log("Connexion réussie, réponse:", response);
        this.errorMessage = "";
        this.isLoading = false;

        // Redirection basée sur le rôle extrait du token JWT
        const role = this.authService.getUserRole();
        console.log("Rôle détecté:", role);

        // Déterminer la route cible
        let targetPath = "";

        switch (role) {
          case "ADMIN":
            console.log("Redirection vers form-elements");
            targetPath = "form-elements"; // Essai avec le chemin exact mentionné
            break;
          case "USER":
            console.log("Redirection vers user-publish");
            targetPath = "user-publish";
            break;
          case "CONTRIBUTOR":
            console.log("Redirection vers form-article");
            targetPath = "article-form";
            break;
          default:
            console.log("Rôle non reconnu, redirection vers analytics");
            targetPath = "analytics";
            break;
        }

        // Obtenir la base URL actuelle
        const baseUrl = window.location.origin;
        const fullUrl = `${baseUrl}/${targetPath}`;

        console.log(`Tentative de navigation vers: ${fullUrl}`);

        // Redirection directe
        window.location.href = fullUrl;
      },
      error: (error) => {
        console.error("Erreur de connexion:", error);
        this.isLoading = false;
        if (error.status === 401) {
          this.errorMessage = "Identifiants invalides";
        } else {
          this.errorMessage =
            "Erreur de connexion au serveur. Veuillez réessayer.";
        }
      },
    });
  }
}
