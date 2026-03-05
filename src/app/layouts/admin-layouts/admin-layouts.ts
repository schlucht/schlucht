import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'ots-admin-layouts',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin-layouts.html',
  styleUrl: './admin-layouts.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayouts {

}
