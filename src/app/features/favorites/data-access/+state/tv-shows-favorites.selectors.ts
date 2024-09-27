import { createSelector } from '@ngrx/store';
import { TvShowDetails, TvShowId } from '@core/models';
import { Dictionary } from '@ngrx/entity';
import { fromTvShowsDetails } from '@features/tv-shows/data-access/+state/tv-shows-details';
import { UserPrefsSelectors } from '@features/user-prefs/data-access/+state';

export const selectIds = UserPrefsSelectors.selectFavoritesIds;

export const selectAll = createSelector(
  fromTvShowsDetails.selectEntities,
  selectIds,
  (entities: Dictionary<TvShowDetails>, ids: TvShowId[]): TvShowDetails[] => {
    return ids
      .map((oneId: TvShowId) => entities[oneId]!)
      .filter((oneTvShow: TvShowDetails) => !!oneTvShow);
  },
);

export const selectIsFavorite = (id: TvShowId) =>
  createSelector(selectIds, (ids: TvShowId[]) => ids.includes(id));

export const selectAreAllLoaded = createSelector(
  selectAll,
  selectIds,
  (entities: TvShowDetails[], ids: TvShowId[]) =>
    entities.length === ids.length,
);

export const selectNotLoadedIds = createSelector(
  selectAll,
  selectIds,
  (entities: TvShowDetails[], ids: TvShowId[]): TvShowId[] => {
    return ids.filter(
      (oneId: TvShowId) =>
        !entities.find((oneShow: TvShowDetails) => oneShow.id === oneId),
    );
  },
);
