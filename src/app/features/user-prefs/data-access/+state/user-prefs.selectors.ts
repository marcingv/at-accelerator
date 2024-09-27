import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUserPrefs from './user-prefs.reducer';

export const selectUserPrefsState = createFeatureSelector<fromUserPrefs.State>(
  fromUserPrefs.userPrefsFeatureKey,
);

export const selectWishlistIds = createSelector(
  selectUserPrefsState,
  (state: fromUserPrefs.State) => state.wishlistShowsIds,
);

export const selectFavoritesIds = createSelector(
  selectUserPrefsState,
  (state: fromUserPrefs.State) => state.favoriteShowsIds,
);
