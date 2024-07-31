import { createFeature, createReducer, on } from '@ngrx/store';
import { TvShowId } from '@core/models';
import { TvShowsFavoritesActions } from '@features/data-access/+state/tv-shows-favorites/tv-shows-favorites.actions';

export const tvShowsFavoritesFeatureKey = 'tvShowsFavorites';

export interface State {
  tvShowsIds: TvShowId[];
}

export const initialState: State = {
  tvShowsIds: [],
};

export const reducer = createReducer(
  initialState,
  on(TvShowsFavoritesActions.toggle, (state, action) => {
    const tvShowsIds: TvShowId[] = state.tvShowsIds.slice();
    if (tvShowsIds.includes(action.id)) {
      tvShowsIds.splice(tvShowsIds.indexOf(action.id), 1);
    } else {
      tvShowsIds.push(action.id);
    }

    return {
      ...state,
      tvShowsIds: tvShowsIds,
    };
  }),
  on(TvShowsFavoritesActions.clear, (state) => {
    return {
      ...state,
      tvShowsIds: [],
    };
  }),
);

export const tvShowsFavoritesFeature = createFeature({
  name: tvShowsFavoritesFeatureKey,
  reducer,
});
