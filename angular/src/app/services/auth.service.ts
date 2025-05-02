import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap, catchError, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  private apiUrl = "http://localhost:8080/auth";

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string }> {
    console.log("Tentative de connexion avec:", { email });
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          if (response?.token) {
            localStorage.setItem("token", response.token);
            console.log("Token stocké avec succès");

            // 🔥 Nouvelle partie pour décoder et stocker le rôle
            const decoded = this.decodeToken(response.token);
            const rawRole =
              decoded?.role ||
              (Array.isArray(decoded?.roles)
                ? decoded.roles[0]
                : decoded?.roles) ||
              (Array.isArray(decoded?.authorities)
                ? decoded.authorities[0]
                : decoded?.authorities);

            const role = rawRole?.replace("ROLE_", "");
            if (role) {
              localStorage.setItem("userRole", role);
              console.log("Rôle extrait et stocké:", role);
            } else {
              console.warn("Aucun rôle valide trouvé dans le token");
            }
          } else {
            console.error("Token manquant dans la réponse");
          }
        }),
        catchError((error) => {
          console.error("Erreur lors de la connexion:", error);
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole"); // 🔄 Nettoyer le rôle aussi
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  decodeToken(token: string): any {
    if (!token) return null;
    try {
      const base64Url = token.split(".")[1];
      if (!base64Url) return null;
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (err) {
      console.error("Erreur de décodage du token:", err);
      return null;
    }
  }

  getUserRole(): string | null {
    return localStorage.getItem("userRole");
  }

  isContributor(): boolean {
    return this.getUserRole() === "CONTRIBUTOR";
  }
}
