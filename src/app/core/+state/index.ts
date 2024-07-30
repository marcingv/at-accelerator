import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { fromTvShows } from '@features/data-access/+state/tv-shows';

export interface State {
  [fromTvShows.tvShowsFeatureKey]: fromTvShows.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromTvShows.tvShowsFeatureKey]: fromTvShows.reducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
