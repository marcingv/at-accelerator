import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { fromTvShows } from '@features/data-access/+state/tv-shows';
import { fromTvShowsList } from '@features/data-access/+state/tv-shows-list';

export interface State {
  [fromTvShows.tvShowsFeatureKey]: fromTvShows.State;
  [fromTvShowsList.tvShowsListFeatureKey]: fromTvShowsList.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromTvShows.tvShowsFeatureKey]: fromTvShows.reducer,
  [fromTvShowsList.tvShowsListFeatureKey]: fromTvShowsList.reducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
