import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface User {
  nom: string;
  email: string;
  password: string;
  grade: string;
  role: string;
}

@Injectable({ providedIn: "root" })
export class UserService {
  private apiUrl = "http://localhost:8080/api/users";

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
