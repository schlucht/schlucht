import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user/user';

@Component({
  selector: 'ots-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  private authService = inject(AuthService);
  user = signal<User | null>(null);

  ngOnInit() {
    this.laodUser()
  }
  
 laodUser () {
    const currentUser = this.authService.user() as User | null;  
    console.log("Aktueller User: ", currentUser?.firstname)
    this.user.set(currentUser);
  }
  
}
