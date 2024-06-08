import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { TvShowsFavouritesService } from '@features/tv-shows-data-access';
import { TvShow } from '@core/models';
import { CardComponent } from '@shared/cards';
import { TvShowCardComponent } from '@features/tv-show-card';

@Component({
  selector: 'app-favorites-view',
  standalone: true,
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, TvShowCardComponent],
})
export class FavoritesViewComponent {
  private readonly favoritesService = inject(TvShowsFavouritesService);

  protected readonly tvShows: Signal<TvShow[]> =
    this.favoritesService.listSignal;
}
