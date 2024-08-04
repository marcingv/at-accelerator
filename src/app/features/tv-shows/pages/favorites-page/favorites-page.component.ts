import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '@shared/cards';
import { TvShowCardComponent } from '@features/tv-shows/components/tv-show-card';
import { FavoriteTvShowsListComponent } from '@features/tv-shows/components/favorite-tv-shows-list';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, TvShowCardComponent, FavoriteTvShowsListComponent],
})
export class FavoritesPageComponent {}
