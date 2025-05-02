import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-publish',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header">
            <h5>Publier un article</h5>
          </div>
          <div class="card-body">
            <form (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label for="title">Titre</label>
                <input type="text" class="form-control" id="title" [(ngModel)]="article.title" name="title" required>
              </div>
              <div class="form-group">
                <label for="content">Contenu</label>
                <textarea class="form-control" id="content" [(ngModel)]="article.content" name="content" rows="6" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary mt-3">Publier</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class UserPublishComponent {
  article = {
    title: '',
    content: ''
  };

  onSubmit() {
    console.log('Article soumis:', this.article);
    // Ici, vous ajouteriez l'appel à votre service pour sauvegarder l'article
    this.article = { title: '', content: '' }; // Réinitialiser le formulaire
  }
} 