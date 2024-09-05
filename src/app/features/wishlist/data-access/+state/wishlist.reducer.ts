import { createFeature, on } from '@ngrx/store';
import { WishlistActions } from './wishlist.actions';
import { TvShowId } from '@core/models';
import { createImmerReducer } from 'ngrx-immer/store';

export const wishlistFeatureKey = 'wishlist';

export interface State {
  tvShowsIds: TvShowId[];
}

export const initialState: State = {
  tvShowsIds: [],
};

export const reducer = createImmerReducer(
  initialState,
  on(WishlistActions.set, (state, action): State => {
    state.tvShowsIds = action.ids;

    return state;
  }),
  on(WishlistActions.toggle, (state, action): State => {
    const idx: number = state.tvShowsIds.indexOf(action.id);
    if (idx >= 0) {
      state.tvShowsIds.splice(idx, 1);
    } else {
      state.tvShowsIds.push(action.id);
    }

    return state;
  }),
  on(WishlistActions.clear, (state): State => {
    state.tvShowsIds = [];

    return state;
  }),
);

export const wishlistFeature = createFeature({
  name: wishlistFeatureKey,
  reducer,
});
