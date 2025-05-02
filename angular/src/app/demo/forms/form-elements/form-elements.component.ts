import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UserService, User } from "../../../services/user.service";

@Component({
  selector: "app-form-elements",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./form-elements.component.html",
})
export class FormElementsComponent {
  user: User = {
    nom: "",
    email: "",
    grade: "",
    password: "",
    role: "",
  };

  constructor(private userService: UserService) {}

  onSubmit() {
    this.userService.createUser(this.user).subscribe({
      next: () => alert("Utilisateur ajouté avec succès !"),
      error: () => alert("Erreur lors de l’ajout de l’utilisateur."),
    });
  }
}
