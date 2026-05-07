import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ots-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  date = new Date().getFullYear();
}
