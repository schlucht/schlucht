import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'ots-header',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  private authService = inject(AuthService);
  private router = inject(Router);

  user = computed(() => this.authService.user());
  isLoggedIn = computed(() => !!this.authService.user());

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
