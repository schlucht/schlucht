import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ots-auth-layout',
  imports: [RouterOutlet],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayout {

}
