import { createFeature, createReducer, on } from '@ngrx/store';
import { TvShowsListActions } from './tv-shows-list.actions';
import { TvShowId } from '@core/models';

export const tvShowsListFeatureKey = 'tvShowsList';

export interface State {
  ids: TvShowId[];
  query: string | undefined;
  page: number;
  pages: number;
  total: number;
  isLoading: boolean;
}

export const initialState: State = {
  ids: [],
  query: undefined,
  page: 0,
  pages: 0,
  total: 0,
  isLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(
    TvShowsListActions.loadPage,
    (state): State => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    TvShowsListActions.loadPageSuccess,
    (state, action): State => ({
      ...state,
      ids: action.ids,
      page: action.page,
      pages: action.pages,
      total: action.total,
      query: action.query,
      isLoading: false,
    }),
  ),
  on(
    TvShowsListActions.loadPageFailure,
    (state): State => ({
      ...state,
      isLoading: false,
    }),
  ),
);

export const tvShowsListFeature = createFeature({
  name: tvShowsListFeatureKey,
  reducer,
});
