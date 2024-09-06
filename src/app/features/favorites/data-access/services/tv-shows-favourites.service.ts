import { inject, Injectable, Signal } from '@angular/core';
import { TvShow, TvShowId } from '@core/models';
import { Store } from '@ngrx/store';
import { TvShowsFavoritesSelectors } from '@features/favorites/data-access/+state';
import { TvShowsFavoritesActions } from '@features/user-prefs/data-access/+state';

@Injectable({
  providedIn: 'root',
})
export class TvShowsFavouritesService {
  private store: Store = inject(Store);

  public readonly idsSignal: Signal<TvShowId[]> = this.store.selectSignal(
    TvShowsFavoritesSelectors.selectIds,
  );

  public readonly favorites = this.store.selectSignal(
    TvShowsFavoritesSelectors.selectAll,
  );

  public clearAll(): void {
    this.store.dispatch(TvShowsFavoritesActions.clear());
  }

  public toggle(tvShow: TvShow): void {
    this.store.dispatch(TvShowsFavoritesActions.toggle({ id: tvShow.id }));
  }

  public isFavourite(tvShowId: TvShowId): Signal<boolean> {
    return this.store.selectSignal(
      TvShowsFavoritesSelectors.selectIsFavorite(tvShowId),
    );
  }
}
