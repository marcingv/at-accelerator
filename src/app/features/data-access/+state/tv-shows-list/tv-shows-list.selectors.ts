import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTvShowsList from './tv-shows-list.reducer';

export const selectTvShowsListState = createFeatureSelector<fromTvShowsList.State>(
  fromTvShowsList.tvShowsListFeatureKey
);
