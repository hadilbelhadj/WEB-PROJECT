import { Component } from "@angular/core";
import { Router } from "@angular/router"; // Ajoute Router pour la redirection
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UserService, User, Role } from "../../../services/user.service";

@Component({
  selector: "app-form-elements",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./form-elements.component.html",
})
export class FormElementsComponent {
  roles: Role[] = [
    { id: 1, role: "USER" },
    { id: 2, role: "ADMIN" },
    { id: 3, role: "CONTRIBUTOR" },
  ];

  user: User = {
    nom: "",
    email: "",
    password: "",
    grade: "",
    role: this.roles[0],
  };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.createUser(this.user).subscribe({
      next: () => alert("Utilisateur ajouté avec succès !"),
      error: (err) => {
        console.error(err);
        alert("Erreur lors de l’ajout de l’utilisateur.");
      },
    });
  }

  // Méthode pour se déconnecter
  logout() {
    localStorage.removeItem("authToken"); // Supprimer le token du localStorage
    alert("Vous êtes maintenant déconnecté."); // Optionnel, afficher une alerte

    // Rediriger l'utilisateur vers la page de connexion (ou une autre page)
    this.router.navigate(['/login']); // Adapte l'URL à ta page de connexion
  }
}
