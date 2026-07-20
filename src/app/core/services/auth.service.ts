import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../models/auth/login';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { ApiResponse } from '../models/http/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.API_URL;

  private _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();

  private _token = signal<string | null>(null);
  readonly token = this._token.asReadonly();

  private _isLoading = signal(false);
  readonly isLoading = this._isLoading.asReadonly();

  private _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = this.getStoredToken();
    if (token) {
      this._token.set(token);
      this.fetchUser().subscribe();
    }
  }

  private getStoredToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  private setStoredToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('auth_token', token);
    }
  }

  private removeStoredToken(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('auth_token');
    }
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    this._isLoading.set(true);
    this._error.set(null);

    return this.http.post<LoginResponse>(
      `${this.apiUrl}${environment.AUTH.LOGIN}`,
      loginRequest
    ).pipe(
      tap((response) => {
        this.setStoredToken(response.data.token);
        this._token.set(response.data.token);
        this._user.set(response.data.user);
        this._isLoading.set(false);
      }),
      catchError((err) => {
        this._isLoading.set(false);
        const errorMessage = err.error?.message || 'Login fehlgeschlagen';
        this._error.set(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  fetchUser(): Observable<User | null> {
    if (!this._token()) {
      return of(null);
    }

    return this.http.get<ApiResponse<User | null>>(`${this.apiUrl}${environment.USER.ME}`)
    .pipe(
      tap((response) => {
        console.log('[AuthService] fetchUser response:', response);
        this._user.set(response.data);
      }),
      map((response) => response.data),
      catchError((err) => {
        console.error('Failed to fetch user data', err);
        // Nur bei 401 ausloggen (ungültiger/abgelaufener Token)
        if (err.status === 401) {
          this.logout();
        }
        return of<User | null>(null);
      })
    );
  }

  logout(): void {
    this.removeStoredToken();
    this._token.set(null);
    this._user.set(null);
    this._error.set(null);
  }

  isLoggedIn(): boolean {
    return !!this.token();
  }
}
