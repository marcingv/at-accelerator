import { createFeature, createReducer, on } from '@ngrx/store';
import { TvShowId } from '@core/models';
import { immerOn } from 'ngrx-immer/store';
import { WishlistActions } from './actions/wishlist.actions';
import { TvShowsFavoritesActions } from './actions/tv-shows-favorites.actions';
import { UserPrefsActions } from '@features/user-prefs/data-access/+state/actions/user-prefs.actions';

export const userPrefsFeatureKey = 'userPrefs';

export interface State {
  favoriteShowsIds: TvShowId[];
  wishlistShowsIds: TvShowId[];
}

export const initialState: State = {
  favoriteShowsIds: [],
  wishlistShowsIds: [],
};

export const reducer = createReducer(
  initialState,
  // Wishlist actions
  immerOn(WishlistActions.set, (state, action) => {
    state.wishlistShowsIds = action.ids;
  }),
  immerOn(WishlistActions.toggle, (state, action) => {
    const idx: number = state.wishlistShowsIds.indexOf(action.id);
    if (idx >= 0) {
      state.wishlistShowsIds.splice(idx, 1);
    } else {
      state.wishlistShowsIds.push(action.id);
    }
  }),
  immerOn(WishlistActions.clear, (state) => {
    state.wishlistShowsIds = [];
  }),

  // Favorites actions
  immerOn(TvShowsFavoritesActions.set, (state, action) => {
    state.favoriteShowsIds = action.ids;
  }),
  immerOn(TvShowsFavoritesActions.toggle, (state, action) => {
    const tvShowsIds: TvShowId[] = state.favoriteShowsIds;
    const idx: number = tvShowsIds.indexOf(action.id);
    if (idx >= 0) {
      tvShowsIds.splice(idx, 1);
    } else {
      tvShowsIds.push(action.id);
    }
  }),
  immerOn(TvShowsFavoritesActions.clear, (state) => {
    state.favoriteShowsIds = [];
  }),

  // General actions
  on(UserPrefsActions.set, (state, action): State => {
    return {
      ...state,
      ...action.state,
    };
  }),
  immerOn(UserPrefsActions.clear, (state) => {
    state.wishlistShowsIds = [];
    state.favoriteShowsIds = [];
  }),
);

export const userPrefsFeature = createFeature({
  name: userPrefsFeatureKey,
  reducer,
});
