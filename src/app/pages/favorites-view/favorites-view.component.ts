import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-favorites-view',
  standalone: true,
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesViewComponent {}
