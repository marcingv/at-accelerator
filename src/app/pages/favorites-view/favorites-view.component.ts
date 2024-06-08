import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '@shared/cards';
import { TvShowCardComponent } from 'src/app/features/tv-shows/components/tv-show-card';
import { FavoriteTvShowsListComponent } from 'src/app/features/tv-shows/components/favorite-tv-shows-list';

@Component({
  selector: 'app-favorites-view',
  standalone: true,
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, TvShowCardComponent, FavoriteTvShowsListComponent],
})
export class FavoritesViewComponent {}
