import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service"; // Assure-toi que le chemin est bon

@Injectable({
  providedIn: "root",
})
export class ContributorGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const role = this.authService.getUserRole();
    console.log("Guard: rôle actuel =", role);

    if (role === "CONTRIBUTOR") {
      return true; // ✅ Laisse passer vers /article-form
    } else {
      console.warn("Accès refusé : redirection vers /sign-in");
      this.router.navigate(["/sign-in"]);
      return false;
    }
  }
}
