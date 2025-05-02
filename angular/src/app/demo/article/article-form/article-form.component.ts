import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ArticleService } from "../../../services/article.service";

@Component({
  selector: "app-article-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./article-form.component.html",
})
export class ArticleFormComponent {
  titre: string = "";
  mots_cles: string = "";
  domaine_id: number = 1; // à remplacer par un vrai select si nécessaire

  constructor(private articleService: ArticleService, private router: Router) {}

  onSubmit() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    console.log("Token actuel dans localStorage :", token);
    console.log("Rôle de l'utilisateur :", role); // Vérification du rôle

    if (!token) {
      alert("Aucun token trouvé. Veuillez vous reconnecter.");
      this.router.navigate(["/sign-in"]);
      return;
    }

    if (role !== "CONTRIBUTOR") {
      alert("Vous devez être un contributeur pour publier un article.");
      this.router.navigate(["/unauthorized"]);
      return;
    }

    const article = {
      titre: this.titre,
      mots_cles: this.mots_cles,
      domaine: { id_domaine: this.domaine_id },
    };

    this.articleService.createArticle(article).subscribe({
      next: () => {
        alert("Article publié avec succès !");
        this.router.navigate(["/form-article"]);
      },
      error: (err) => {
        console.error("Erreur HTTP :", err);
        alert("Erreur lors de la publication de l'article.");
      },
    });
  }

  logout() {
    localStorage.removeItem("token");
    alert("Déconnexion réussie.");
    this.router.navigate(["/sign-in"]);
  }
}
