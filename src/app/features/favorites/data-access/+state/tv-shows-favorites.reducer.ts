import { createFeature, createReducer } from '@ngrx/store';
import { TvShowId } from '@core/models';
import { TvShowsFavoritesActions } from '@features/favorites/data-access/+state/tv-shows-favorites.actions';
import { immerOn } from 'ngrx-immer/store';

export const tvShowsFavoritesFeatureKey = 'tvShowsFavorites';

export interface State {
  tvShowsIds: TvShowId[];
}

export const initialState: State = {
  tvShowsIds: [],
};

export const reducer = createReducer(
  initialState,
  immerOn(TvShowsFavoritesActions.set, (state, action) => {
    state.tvShowsIds = action.ids;
  }),
  immerOn(TvShowsFavoritesActions.toggle, (state, action) => {
    const tvShowsIds: TvShowId[] = state.tvShowsIds;
    const idx: number = tvShowsIds.indexOf(action.id);
    if (idx >= 0) {
      tvShowsIds.splice(idx, 1);
    } else {
      tvShowsIds.push(action.id);
    }
  }),
  immerOn(TvShowsFavoritesActions.clear, (state) => {
    state.tvShowsIds = [];
  }),
);

export const tvShowsFavoritesFeature = createFeature({
  name: tvShowsFavoritesFeatureKey,
  reducer,
});
