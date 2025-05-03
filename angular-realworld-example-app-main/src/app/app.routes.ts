import { Routes } from "@angular/router";
import { inject } from "@angular/core";
import { UserService } from "./core/auth/services/user.service";
import { map } from "rxjs/operators";
import { roleGuard } from "./core/guards/role.guard";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./features/article/pages/home/home.component").then(m => m.default),
  },
  {
    path: "login",
    loadComponent: () => import("./core/auth/auth.component").then(m => m.default),
    canActivate: [
      () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    ],
  },
  {
    path: "register",
    loadComponent: () => import("./core/auth/auth.component").then(m => m.default),
    canActivate: [
      () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    ],
  },
  {
    path: "settings",
    loadComponent: () => import("./features/settings/settings.component").then(m => m.default),
    canActivate: [() => inject(UserService).isAuthenticated],
  },
  {
    path: "profile",
    loadChildren: () => import("./features/profile/profile.routes"),
  },
  {
    path: "editor",
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./features/article/pages/editor/editor.component").then(m => m.default),
        canActivate: [() => inject(UserService).isAuthenticated],
      },
      {
        path: ":slug",
        loadComponent: () =>
          import("./features/article/pages/editor/editor.component").then(m => m.default),
        canActivate: [() => inject(UserService).isAuthenticated],
      },
    ],
  },
  {
    path: "article/:slug",
    loadComponent: () =>
      import("./features/article/pages/article/article.component").then(m => m.default),
  },
  {
    path: "admin",
    children: [
      {
        path: "dashboard",
        loadComponent: () => import("./features/admin/admin-dashboard.component").then(m => m.AdminDashboardComponent ),
        canActivate: [roleGuard],
        data: { role: 'ADMIN' }
      },
      {
        path: "users",
        loadComponent: () => import("./features/admin/user-list.component").then(m => m.UserListComponent ),
        canActivate: [roleGuard],
        data: { role: 'ADMIN' }
      },
      {
        path: "users/edit/:id",
        loadComponent: () => import("./features/admin/user-edit.component").then(m => m.UserEditComponent)
      }
    ]
  },
  {
    path: "contributor",
    loadComponent: () => import("./features/contributor/contributor-dashboard.component").then(m => m.ContributorDashboardComponent),
    canActivate: [roleGuard],
    data: { role: 'CONTRIBUTOR' }
  }
];