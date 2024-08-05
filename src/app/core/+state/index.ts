import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { fromWishlist } from '@features/wishlist/data-access/+state';
import { fromTvShows } from '@features/tv-shows/data-access/+state/tv-shows';
import { fromTvShowsList } from '@features/search/data-access/+state';
import { fromTvShowsFavorites } from '@features/favorites/data-access/+state';
import { fromTvShowsDetails } from '@features/tv-shows/data-access/+state/tv-shows-details';
import { fromUser } from '@features/auth/data-access/+state';

export interface State {
  [fromUser.userFeatureKey]: fromUser.State;
  [fromTvShows.tvShowsFeatureKey]: fromTvShows.State;
  [fromTvShowsList.tvShowsListFeatureKey]: fromTvShowsList.State;
  [fromTvShowsFavorites.tvShowsFavoritesFeatureKey]: fromTvShowsFavorites.State;
  [fromTvShowsDetails.tvShowsDetailsFeatureKey]: fromTvShowsDetails.State;
  [fromWishlist.wishlistFeatureKey]: fromWishlist.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromUser.userFeatureKey]: fromUser.reducer,
  [fromTvShows.tvShowsFeatureKey]: fromTvShows.reducer,
  [fromTvShowsList.tvShowsListFeatureKey]: fromTvShowsList.reducer,
  [fromTvShowsFavorites.tvShowsFavoritesFeatureKey]:
    fromTvShowsFavorites.reducer,
  [fromTvShowsDetails.tvShowsDetailsFeatureKey]: fromTvShowsDetails.reducer,
  [fromWishlist.wishlistFeatureKey]: fromWishlist.reducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
