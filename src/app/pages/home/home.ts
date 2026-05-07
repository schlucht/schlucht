import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user/user';
import { Card } from '../../components/card/card';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'ots-home',
  imports: [RouterLink, Card],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  user = signal<User | null>(null);
  count = computed(() => this.userService.userCount());

  ngOnInit() {
    this.laodUser()
  }
  
 laodUser () {
    const currentUser = this.authService.user() as User | null;  
    console.log("Aktueller User: ", currentUser?.firstname)
    this.user.set(currentUser);
  }
  
}
