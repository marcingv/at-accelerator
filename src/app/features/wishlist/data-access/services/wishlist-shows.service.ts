import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { TvShow, TvShowId } from '@core/models';
import {
  WishlistActions,
  WishlistSelectors,
} from '@features/wishlist/data-access/+state';

@Injectable({
  providedIn: 'root',
})
export class WishlistShowsService {
  private store: Store = inject(Store);

  public shows: Signal<TvShow[]> = this.store.selectSignal(
    WishlistSelectors.selectWishlistEntities,
  );

  public isOnWishlist(id: TvShowId): Signal<boolean> {
    return this.store.selectSignal(WishlistSelectors.selectIsOnWishlist(id));
  }

  public toggle(id: TvShowId): void {
    this.store.dispatch(WishlistActions.toggle({ id: id }));
  }
}
