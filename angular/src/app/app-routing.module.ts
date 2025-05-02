// Angular Import
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// project import
import { AdminComponent } from "./theme/layout/admin/admin.component";
import { GuestComponent } from "./theme/layout/guest/guest.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "",
        redirectTo: "/analytics",
        pathMatch: "full",
      },
      {
        path: "analytics",
        loadComponent: () =>
          import("./demo/dashboard/dash-analytics.component"),
      },
      {
        path: "component",
        loadChildren: () =>
          import("./demo/ui-element/ui-basic.module").then(
            (m) => m.UiBasicModule
          ),
      },
      {
        path: "chart",
        loadComponent: () => import("./demo/chart-maps/core-apex.component"),
      },
      {
        path: "forms",
        loadComponent: () =>
          import("./demo/forms/form-elements/form-elements.component").then(
            (m) => m.FormElementsComponent
          ),
      },
      {
        path: "tables",
        loadComponent: () =>
          import("./demo/tables/tbl-bootstrap/tbl-bootstrap.component"),
      },
      {
        path: "sample-page",
        loadComponent: () =>
          import("./demo/other/sample-page/sample-page.component"),
      },
      {
        path: "user-publish",
        loadComponent: () =>
          import("./demo/pages/user/user-publish/user-publish.component"),
      },
      {
        path: "contributor-articles",
        loadComponent: () =>
          import("./demo/pages/contributor/contributor-articles/contributor-articles.component"),
      },
    ],
  },
  {
    path: "",
    component: GuestComponent,
    children: [
      {
        path: "auth/signup",
        loadComponent: () =>
          import("./demo/pages/authentication/sign-up/sign-up.component"),
      },
      {
        path: "sign-in",
        loadComponent: () =>
          import("./demo/pages/authentication/sign-in/sign-in.component").then(
            (m) => m.LoginComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
