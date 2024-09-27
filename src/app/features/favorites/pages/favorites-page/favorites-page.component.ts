import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardComponent } from '@shared/cards';
import { TvShowCardComponent } from '@features/tv-shows/components/tv-show-card';
import { FavoriteTvShowsListComponent } from '@features/favorites/components/favorite-tv-shows-list';
import { TranslationKey } from '@core/translations';
import { TvShowsFavouritesService } from '@features/favorites/data-access/services';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, TvShowCardComponent, FavoriteTvShowsListComponent],
})
export class FavoritesPageComponent {
  private readonly favoritesService = inject(TvShowsFavouritesService);

  protected readonly EMPTY_MESSAGE: TranslationKey =
    'favoritesShows.emptyMessage';

  public readonly favorites = this.favoritesService.favorites;

  constructor() {
    toObservable(this.favoritesService.idsSignal)
      .pipe(
        tap(() => this.favoritesService.reload()),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
