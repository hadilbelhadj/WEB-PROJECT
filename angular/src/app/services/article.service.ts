import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ArticleService {
  private apiUrl = "http://localhost:8080/api/articles";

  constructor(private http: HttpClient) {}

  createArticle(article: any): Observable<any> {
    const token = localStorage.getItem("token"); // 🔐 Récupère le token
    if (!token) {
      console.error("Aucun token trouvé pour l'utilisateur !");
      return new Observable((observer) => {
        observer.error("Token manquant");
      });
    }

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ Envoie du token dans le header Authorization
    });

    return this.http.post(this.apiUrl, article, { headers });
  }
}
