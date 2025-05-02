import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Role {
  id: number;
  role: string;
}

export interface User {
  nom: string;
  email: string;
  password: string;
  grade: string;
  role: Role;
}

@Injectable({ providedIn: "root" })
export class UserService {
  private apiUrl = "http://localhost:8080/api/users";

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    // Supposons que le token est stocké dans localStorage
    const token = localStorage.getItem("authToken");

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<User>(this.apiUrl, user, { headers });
  }
}
