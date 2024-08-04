import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromWishlist from './wishlist.reducer';
import { TvShow, TvShowId } from '@core/models';
import { fromTvShows } from '@features/data-access/+state/tv-shows';
import { Dictionary } from '@ngrx/entity';

export const selectWishlistState = createFeatureSelector<fromWishlist.State>(
  fromWishlist.wishlistFeatureKey,
);

export const selectWishlistIds = createSelector(
  selectWishlistState,
  (state: fromWishlist.State): TvShowId[] => state.tvShowsIds,
);

export const selectWishlistEntities = createSelector(
  selectWishlistIds,
  fromTvShows.selectEntities,
  (ids: TvShowId[], entities: Dictionary<TvShow>): TvShow[] => {
    return ids
      .map((oneId: TvShowId) => entities[oneId]!)
      .filter((oneShow: TvShow) => !!oneShow);
  },
);
