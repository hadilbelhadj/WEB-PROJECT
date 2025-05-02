import { Routes } from "@angular/router";
import { ContributorGuard } from "./guards/contributor.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "sign-in", // or 'form-elements' if that's your intended landing page
    pathMatch: "full",
  },
  {
    path: "sign-in",
    loadComponent: () =>
      import("./demo/pages/authentication/sign-in/sign-in.component").then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: "form-elements",
    loadComponent: () =>
      import("./demo/forms/form-elements/form-elements.component").then(
        (m) => m.FormElementsComponent
      ),
  },
  {
    path: "article-form",
    canActivate: [ContributorGuard], // 🔐 Ajout de la protection
    loadComponent: () =>
      import("./demo/article/article-form/article-form.component").then(
        (m) => m.ArticleFormComponent
      ),
  },
  {
    path: "**",
    redirectTo: "sign-in", // optional: fallback for unknown routes
  },
];
