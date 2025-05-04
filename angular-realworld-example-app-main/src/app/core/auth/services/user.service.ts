import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { JwtService } from "./jwt.service";
import { map, distinctUntilChanged, tap, shareReplay } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Role, User } from "../user.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  constructor(
    private readonly http: HttpClient,
    private readonly jwtService: JwtService,
    private readonly router: Router,
  ) {}

  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>("http://localhost:8080/auth/login", credentials)
      .pipe(
        tap((response) => {
          this.jwtService.saveToken(response.token);
          this.getCurrentUser().subscribe({
            next: () => {
              const role = this.jwtService.getCurrentRole();
              this.redirectBasedOnRole(role);
            },
            error: () => this.purgeAuth()
          });
        })
      );
  }

  register(credentials: {
    nom: string;
    email: string;
    password: string;
    grade: string;
  }): Observable<User> {
    return this.http
      .post<User>("http://localhost:8080/api/users", credentials)
      .pipe(
        tap((user) => {
          this.setAuth(user); // Save token if returned in response
          this.redirectBasedOnRole(user.role); // redirect based on backend user role
        })
      );
  }
  

  logout(): void {
    this.purgeAuth();
    void this.router.navigate(["/"]);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>("http://localhost:8080/api/users/me").pipe(
      tap({
        next: (user) => this.currentUserSubject.next(user),
        error: () => this.purgeAuth(),
      }),
      shareReplay(1),
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8080/api/users");
  }

  update(user: Partial<User>): Observable<User> {
    return this.http.put<User>("http://localhost:8080/api/users", user).pipe(
      tap((updatedUser) => {
        this.currentUserSubject.next(updatedUser);
      }),
    );
  }
  
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`http://localhost:8080/api/users/${userId}`);
  }
  
  updateUser(userId: number, userData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`http://localhost:8080/api/users/${userId}`, userData);
  }


  deleteUser(id_user: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/users/${id_user}`);
  };

  setAuth(user: User): void {
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
  }

  purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
  }

  private redirectBasedOnRole(role: Role | null): void {
    switch(role) {
      case 'ADMIN':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'CONTRIBUTOR':
        this.router.navigate(['/contributor/dashboard']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }
}