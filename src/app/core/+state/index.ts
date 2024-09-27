import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { fromTvShows } from '@features/tv-shows/data-access/+state/tv-shows';
import { fromTvShowsList } from '@features/search/data-access/+state';
import { fromTvShowsDetails } from '@features/tv-shows/data-access/+state/tv-shows-details';
import { fromUser } from '@features/auth/data-access/+state';
import { fromUserPrefs } from '@features/user-prefs/data-access/+state';

export interface State {
  [fromUser.userFeatureKey]: fromUser.State;
  [fromUserPrefs.userPrefsFeatureKey]: fromUserPrefs.State;
  [fromTvShows.tvShowsFeatureKey]: fromTvShows.State;
  [fromTvShowsList.tvShowsListFeatureKey]: fromTvShowsList.State;
  [fromTvShowsDetails.tvShowsDetailsFeatureKey]: fromTvShowsDetails.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromUser.userFeatureKey]: fromUser.reducer,
  [fromUserPrefs.userPrefsFeatureKey]: fromUserPrefs.reducer,
  [fromTvShows.tvShowsFeatureKey]: fromTvShows.reducer,
  [fromTvShowsList.tvShowsListFeatureKey]: fromTvShowsList.reducer,
  [fromTvShowsDetails.tvShowsDetailsFeatureKey]: fromTvShowsDetails.reducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
