import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-admin-dashboard",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h1>Admin Dashboard</h1>
    <nav>
      <a routerLink="/admin/users">Manage Users</a>
    </nav>
  `
})
export class AdminDashboardComponent {}