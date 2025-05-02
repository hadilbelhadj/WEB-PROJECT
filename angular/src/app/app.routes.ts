import { Routes } from "@angular/router";

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
    path: "**",
    redirectTo: "sign-in", // optional: fallback for unknown routes
  },
];
