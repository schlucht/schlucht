import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Footer } from '../../components/footer/footer';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'ots-main-layouts',
  imports: [RouterOutlet, Footer, RouterLink, RouterLinkActive],
  templateUrl: './main-layouts.html',
  styleUrl: './main-layouts.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayouts {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  user = computed(() => this.authService.user());

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
