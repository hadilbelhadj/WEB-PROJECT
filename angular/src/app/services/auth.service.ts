import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap, catchError, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  private apiUrl = "http://localhost:8080/auth";

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string }> {
    console.log('Tentative de connexion avec:', { email });
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          console.log('Réponse reçue:', response);
          if (response && response.token) {
            localStorage.setItem("token", response.token); // Store JWT
            console.log('Token stocké. Décodage du token...');
            const decodedToken = this.decodeToken(response.token);
            console.log('Token décodé:', decodedToken);
          } else {
            console.error('Token manquant dans la réponse');
          }
        }),
        catchError(error => {
          console.error('Erreur lors de la connexion:', error);
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Décoder le token JWT
  decodeToken(token: string): any {
    if (!token) return null;
    try {
      // Le token JWT est au format: header.payload.signature
      // Nous devons décoder la partie payload (deuxième partie)
      const base64Url = token.split('.')[1];
      if (!base64Url) {
        console.error('Format de token invalide:', token);
        return null;
      }
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      // Décoder la chaîne base64
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch(err) {
      console.error('Erreur lors du décodage du token:', err, 'Token:', token);
      return null;
    }
  }

  // Obtenir le rôle de l'utilisateur à partir du token
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) {
      console.error('Aucun token trouvé');
      return null;
    }

    const decodedToken = this.decodeToken(token);
    console.log('Token décodé pour getUserRole:', decodedToken);
    
    // Vérifier différentes propriétés possibles pour le rôle
    if (decodedToken) {
      const role = decodedToken.role || decodedToken.roles || 
                  (decodedToken.authorities && decodedToken.authorities[0]);
      console.log('Rôle extrait:', role);
      return role;
    }
    return null;
  }
}
