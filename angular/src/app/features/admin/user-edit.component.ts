import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from "../../core/auth/services/user.service";
import { User, Role } from '../../core/auth/user.model';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="edit-container">
      <h2>Edit User</h2>
      <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>ID</label>
          <input type="text" class="form-control" [value]="userId" disabled>
        </div>

        <div class="form-group">
          <label>Nom*</label>
          <input type="text" formControlName="nom" class="form-control" required>
        </div>
        
        <div class="form-group">
          <label>Email*</label>
          <input type="email" formControlName="email" class="form-control" required>
        </div>
        
        <div class="form-group">
          <label>Grade</label>
          <input type="text" formControlName="grade" class="form-control">
        </div>

        <div class="form-group">
          <label>Role*</label>
          <select formControlName="role" class="form-control" required>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="CONTRIBUTOR">CONTRIBUTOR</option>
          </select>
        </div>

        <div class="form-group">
          <label>Bio</label>
          <textarea formControlName="bio" class="form-control" rows="3"></textarea>
        </div>
        
        <div class="button-group">
          <button type="submit" class="save-button" [disabled]="editForm.invalid || isSubmitting">
            {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
          </button>
          <button type="button" class="cancel-button" (click)="onCancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .edit-container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .form-group {
      margin-bottom: 15px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    
    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    select.form-control {
      height: auto;
      padding: 8px;
    }
    
    .button-group {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    
    .save-button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .save-button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
    
    .cancel-button {
      background-color: #f44336;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class UserEditComponent implements OnInit {
  editForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    grade: new FormControl(''),
    role: new FormControl<Role>('USER', [Validators.required]),
    bio: new FormControl('')
  });
  
  userId!: number;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.params['id'];
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.editForm.patchValue({
          nom: user.nom,
          email: user.email,
          grade: user.grade || '',
          role: user.role,
          bio: user.bio || ''
        });
      },
      error: (err) => {
        console.error('Error loading user:', err);
        this.router.navigate(['/admin/users']);
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.isSubmitting = true;
      
      // Solution recommandée (version sécurisée)
      const formData = this.editForm.getRawValue();
      const updatedUser: Partial<User> = {
        nom: formData.nom!,
        email: formData.email!,
        role: formData.role!,
        grade: formData.grade || undefined,  // Champ optionnel
        bio: formData.bio || undefined      // Champ optionnel
      };
  
      this.userService.updateUser(this.userId, updatedUser).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/admin/users']);
        },
        error: (err) => {
          console.error('Error updating user:', err);
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/users']);
  }
}