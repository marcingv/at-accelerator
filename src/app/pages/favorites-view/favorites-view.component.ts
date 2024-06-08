import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '@shared/cards';
import { TvShowCardComponent } from '@features/tv-show-card';
import { FavoriteTvShowsListComponent } from '@features/favorite-tv-shows-list';

@Component({
  selector: 'app-favorites-view',
  standalone: true,
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, TvShowCardComponent, FavoriteTvShowsListComponent],
})
export class FavoritesViewComponent {}
