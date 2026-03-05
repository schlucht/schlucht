import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { User } from '../../../core/models/user/user';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'ots-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Users implements OnInit {
  
  private userService = inject(UserService);
  users = signal<User[]>([]);
  isLoading = signal(true);

  constructor() {
    
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    // Simuliere API-Call - ersetze mit echtem Endpoint
    this.isLoading.set(true);
    this.userService.getUsers().subscribe({
      next: (users: any) => {       
        this.users.set(users);  
        console.log(this.users().length); // Debug-Ausgabe der geladenen Benutzer      
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load users', err);
        this.isLoading.set(false);
      }
    });
    // Mock-Daten
    // setTimeout(() => {
    //   this.users.set([
    //     { id: 1, name: 'Max Mustermann', email: 'max@example.com' },
    //     { id: 2, name: 'Anna Schmidt', email: 'anna@example.com' },
    //     { id: 3, name: 'Tom Weber', email: 'tom@example.com' },
    //   ]);
    //   this.isLoading.set(false);
    // }, 500);

    // Echter API-Call (auskommentiert):
    // this.http.get<User[]>(`${environment.API_URL}/users`).subscribe({
    //   next: (users) => {
    //     this.users.set(users);
    //     this.isLoading.set(false);
    //   },
    //   error: (err) => {
    //     console.error('Failed to load users', err);
    //     this.isLoading.set(false);
    //   }
    // });
  }
}
