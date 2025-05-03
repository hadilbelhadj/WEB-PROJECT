import { Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode';
import { Role } from "../user.model";

@Injectable({ providedIn: "root" })
export class JwtService {
  getToken(): string {
    return localStorage.getItem('jwtToken') || '';
  }

  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  destroyToken(): void {
    localStorage.removeItem('jwtToken');
  }

  decodeToken(): { role: Role } | null {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      return jwtDecode<{ role: Role }>(token);
    } catch {
      return null;
    }
  }

  getCurrentRole(): Role | null {
    return this.decodeToken()?.role || null;
  }
}