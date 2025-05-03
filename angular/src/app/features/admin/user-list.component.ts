import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserService } from "../../core/auth/services/user.service";
import { User, Role } from "../../core/auth/user.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-list",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>User Management</h2>
    <table class="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Grade</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of users">
          <td>{{ user.id_user }}</td>
          <td>{{ user.nom }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.grade }}</td>
          <td>{{ user.role }}</td>
          <td class="actions-cell">
            <button class="edit-button" (click)="editUser(user.id_user)">
              Edit
            </button>
            <button 
              class="delete-button" 
              (click)="deleteUser(user.id_user)"
              [disabled]="isDeleting === user.id_user"
            >
              {{ isDeleting === user.id_user ? 'Deleting...' : 'Delete' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    .user-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    
    .user-table th, .user-table td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    
    .user-table th {
      background-color: #f8f9fa;
      font-weight: 600;
    }
    
    .user-table tr:hover {
      background-color: #f5f5f5;
    }
    
    .actions-cell {
      display: flex;
      gap: 8px;
    }
    
    .edit-button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;
    }
    
    .edit-button:hover {
      background-color: #45a049;
    }
    
    .delete-button {
      background-color: #ff4444;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;
    }
    
    .delete-button:hover:not([disabled]) {
      background-color: #cc0000;
    }
    
    .delete-button:disabled {
      background-color: #ff9999;
      cursor: not-allowed;
    }
  `]
})
export class UserListComponent {
  users: User[] = [];
  isDeleting: number | null = null;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => this.users = users,
      error: (err) => console.error('Error loading users:', err)
    });
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.isDeleting = userId;
      
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id_user !== userId);
          this.isDeleting = null;
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          this.isDeleting = null;
        }
      });
    }
  }

  editUser(userId: number): void {
    this.router.navigate(['/admin/users/edit', userId]);
  }
}