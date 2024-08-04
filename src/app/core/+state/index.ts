import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { fromTvShows } from '@features/data-access/+state/tv-shows';
import { fromTvShowsList } from '@features/data-access/+state/tv-shows-list';
import { fromTvShowsFavorites } from '@features/data-access/+state/tv-shows-favorites';
import { fromTvShowsDetails } from '@features/data-access/+state/tv-shows-details';
import { fromWishlist } from '@features/wishlist/data-access/+state';

export interface State {
  [fromTvShows.tvShowsFeatureKey]: fromTvShows.State;
  [fromTvShowsList.tvShowsListFeatureKey]: fromTvShowsList.State;
  [fromTvShowsFavorites.tvShowsFavoritesFeatureKey]: fromTvShowsFavorites.State;
  [fromTvShowsDetails.tvShowsDetailsFeatureKey]: fromTvShowsDetails.State;
  [fromWishlist.wishlistFeatureKey]?: fromWishlist.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromTvShows.tvShowsFeatureKey]: fromTvShows.reducer,
  [fromTvShowsList.tvShowsListFeatureKey]: fromTvShowsList.reducer,
  [fromTvShowsFavorites.tvShowsFavoritesFeatureKey]:
    fromTvShowsFavorites.reducer,
  [fromTvShowsDetails.tvShowsDetailsFeatureKey]: fromTvShowsDetails.reducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
