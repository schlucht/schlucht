import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../models/user/user';
import { ApiResponse } from '../models/http/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);
  private apiUrl = environment.API_URL;
  private registerUrl = this.apiUrl + environment.AUTH.REGISTER;

  userCount = signal(0);

  constructor() {
    this.getUsers();
  }

  getUsers(): Observable<User[]> {
    return this.httpClient
      .get<ApiResponse<User[] | string>>(`${this.apiUrl}${environment.USER.ALL}`)
      .pipe(
      map((response) => {
        if (Array.isArray(response.data)) {
          return response.data;
        }

        if (typeof response.data === 'string') {
          const parsed = JSON.parse(response.data) as unknown;
          const usr = Array.isArray(parsed) ? (parsed as User[]) : [];          
          this.userCount.set(usr.length);          
          return usr;
        }
        return [];
      }),
      catchError((error) => {
        console.error('Error fetching user data:', error);
        return throwError(() => new Error('Failed to fetch user data. Please try again later.'));
      })
    );
  }

  newUser(user: User) {
    if(user) {
      const body = JSON.stringify(user);
      const headers = { 'Content-Type': 'application/json' };
      return this.httpClient.post(this.registerUrl, body, { headers });
    }
    return null
  }
}
