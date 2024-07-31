import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { fromTvShows } from '@features/data-access/+state/tv-shows';
import { fromTvShowsList } from '@features/data-access/+state/tv-shows-list';
import { fromTvShowsFavorites } from '@features/data-access/+state/tv-shows-favorites';

export interface State {
  [fromTvShows.tvShowsFeatureKey]: fromTvShows.State;
  [fromTvShowsList.tvShowsListFeatureKey]: fromTvShowsList.State;
  [fromTvShowsFavorites.tvShowsFavoritesFeatureKey]: fromTvShowsFavorites.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromTvShows.tvShowsFeatureKey]: fromTvShows.reducer,
  [fromTvShowsList.tvShowsListFeatureKey]: fromTvShowsList.reducer,
  [fromTvShowsFavorites.tvShowsFavoritesFeatureKey]:
    fromTvShowsFavorites.reducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
