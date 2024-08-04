import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromWishlist from './wishlist.reducer';
import { TvShow, TvShowId } from '@core/models';
import { Dictionary } from '@ngrx/entity';
import { fromTvShows } from '@features/tv-shows/data-access/+state/tv-shows';

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

export const selectIsOnWishlist = (id: TvShowId) =>
  createSelector(selectWishlistIds, (ids: TvShowId[]) => ids.includes(id));

export const selectAreWishlistEntitiesLoaded = createSelector(
  selectWishlistIds,
  fromTvShows.selectEntities,
  (ids: TvShowId[], entities: Dictionary<TvShow>) => {
    return ids.every((oneId) => !!entities[oneId]);
  },
);
