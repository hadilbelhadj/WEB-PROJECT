import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contributor-articles',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header">
            <h5>Articles publiés</h5>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Auteur</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let article of articles">
                    <td>{{ article.title }}</td>
                    <td>{{ article.author }}</td>
                    <td>{{ article.date }}</td>
                    <td>
                      <button class="btn btn-info btn-sm">Voir</button>
                      <button class="btn btn-primary btn-sm ml-2">Contribuer</button>
                    </td>
                  </tr>
                  <tr *ngIf="articles.length === 0">
                    <td colspan="4" class="text-center">Aucun article disponible</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ContributorArticlesComponent implements OnInit {
  articles = [
    { title: 'Introduction à l\'intelligence artificielle', author: 'John Doe', date: '2023-04-15' },
    { title: 'Les avancées en apprentissage profond', author: 'Jane Smith', date: '2023-05-22' },
    { title: 'Impacts sociaux de l\'IA', author: 'David Brown', date: '2023-06-10' }
  ];

  ngOnInit(): void {
    // Ici, vous pourriez charger les articles depuis un service
  }
} 