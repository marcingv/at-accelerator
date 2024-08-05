import { createFeature, createReducer, on } from '@ngrx/store';
import { WishlistActions } from './wishlist.actions';
import { TvShowId } from '@core/models';

export const wishlistFeatureKey = 'wishlist';

export interface State {
  tvShowsIds: TvShowId[];
}

export const initialState: State = {
  tvShowsIds: [],
};

export const reducer = createReducer(
  initialState,
  on(
    WishlistActions.set,
    (state, action): State => ({
      ...state,
      tvShowsIds: action.ids,
    }),
  ),
  on(WishlistActions.toggle, (state, action): State => {
    const ids: TvShowId[] = [...state.tvShowsIds];
    if (ids.includes(action.id)) {
      ids.splice(ids.indexOf(action.id), 1);
    } else {
      ids.push(action.id);
    }

    return {
      ...state,
      tvShowsIds: ids,
    };
  }),
  on(
    WishlistActions.clear,
    (state): State => ({
      ...state,
      tvShowsIds: [],
    }),
  ),
);

export const wishlistFeature = createFeature({
  name: wishlistFeatureKey,
  reducer,
});
