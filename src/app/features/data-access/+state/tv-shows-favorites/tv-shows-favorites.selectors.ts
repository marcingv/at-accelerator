import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTvShowsFavorites from './tv-shows-favorites.reducer';
import { TvShow, TvShowId } from '@core/models';
import { fromTvShows } from '@features/data-access/+state/tv-shows';
import { Dictionary } from '@ngrx/entity';

export const selectTvShowsFavoritesState =
  createFeatureSelector<fromTvShowsFavorites.State>(
    fromTvShowsFavorites.tvShowsFavoritesFeatureKey,
  );

export const selectIds = createSelector(
  selectTvShowsFavoritesState,
  (state: fromTvShowsFavorites.State): TvShowId[] => state.tvShowsIds,
);

export const selectAll = createSelector(
  fromTvShows.selectEntities,
  selectIds,
  (entities: Dictionary<TvShow>, ids: TvShowId[]) => {
    return ids
      .map((oneId: TvShowId) => entities[oneId]!)
      .filter((oneTvShow: TvShow) => !!oneTvShow);
  },
);

export const selectIsFavorite = (id: TvShowId) =>
  createSelector(selectIds, (ids: TvShowId[]) => ids.includes(id));
