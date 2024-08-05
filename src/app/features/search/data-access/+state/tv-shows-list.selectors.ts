import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTvShowsList from './tv-shows-list.reducer';
import { Dictionary } from '@ngrx/entity';
import { TvShow, TvShowId } from '@core/models';
import { fromTvShows } from '@features/tv-shows/data-access/+state/tv-shows';

export const selectTvShowsListState =
  createFeatureSelector<fromTvShowsList.State>(
    fromTvShowsList.tvShowsListFeatureKey,
  );

export const selectCurrentPage = createSelector(
  selectTvShowsListState,
  (state: fromTvShowsList.State) => state.page,
);

export const selectCurrentQuery = createSelector(
  selectTvShowsListState,
  (state: fromTvShowsList.State) => state.query ?? null,
);

export const selectPagesCount = createSelector(
  selectTvShowsListState,
  (state: fromTvShowsList.State) => state.pages,
);

export const selectTotalCount = createSelector(
  selectTvShowsListState,
  (state: fromTvShowsList.State) => state.total,
);

export const selectCurrentIds = createSelector(
  selectTvShowsListState,
  (state: fromTvShowsList.State) => state.ids,
);

export const selectIsLoading = createSelector(
  selectTvShowsListState,
  (state: fromTvShowsList.State) => state.isLoading,
);

export const selectCurrentPageEntities = createSelector(
  fromTvShows.selectEntities,
  selectCurrentIds,
  (entities: Dictionary<TvShow>, ids: TvShowId[]): TvShow[] => {
    return ids
      .map((oneId) => entities[oneId]!)
      .filter((oneTvShow) => !!oneTvShow);
  },
);
