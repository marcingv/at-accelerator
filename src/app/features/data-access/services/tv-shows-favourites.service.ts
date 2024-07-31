import { inject, Injectable, Signal } from '@angular/core';
import { TvShow, TvShowId } from '@core/models';
import { Store } from '@ngrx/store';
import {
  TvShowsFavoritesActions,
  TvShowsFavoritesSelectors,
} from '@features/data-access/+state/tv-shows-favorites';

@Injectable({
  providedIn: 'root',
})
export class TvShowsFavouritesService {
  private store: Store = inject(Store);

  public idsSignal: Signal<TvShowId[]> = this.store.selectSignal(
    TvShowsFavoritesSelectors.selectIds,
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
