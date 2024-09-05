import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TvShowsDetailsActions } from './tv-shows-details.actions';
import { TvShowDetails, TvShowId } from '@core/models';

export const tvShowsDetailsFeatureKey = 'tvShowsDetails';

export interface State extends EntityState<TvShowDetails> {
  // additional entities state properties
}

export const adapter: EntityAdapter<TvShowDetails> =
  createEntityAdapter<TvShowDetails>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(TvShowsDetailsActions.add, (state, action) =>
    adapter.addOne(action.model, state),
  ),
  on(TvShowsDetailsActions.upsert, (state, action) =>
    adapter.upsertOne(action.model, state),
  ),
  on(TvShowsDetailsActions.addMany, (state, action) =>
    adapter.addMany(action.models, state),
  ),
  on(TvShowsDetailsActions.upsertMany, (state, action) =>
    adapter.upsertMany(action.models, state),
  ),
  on(TvShowsDetailsActions.update, (state, action) =>
    adapter.updateOne(action.model, state),
  ),
  on(TvShowsDetailsActions.updateMany, (state, action) =>
    adapter.updateMany(action.models, state),
  ),
  on(TvShowsDetailsActions.delete, (state, action) =>
    adapter.removeOne(action.id, state),
  ),
  on(TvShowsDetailsActions.deleteMany, (state, action) =>
    adapter.removeMany(action.ids, state),
  ),
  on(TvShowsDetailsActions.clear, (state) => adapter.removeAll(state)),
);

export const tvShowsDetailsFeature = createFeature({
  name: tvShowsDetailsFeatureKey,
  reducer,
  extraSelectors: ({ selectTvShowsDetailsState }) => ({
    ...adapter.getSelectors(selectTvShowsDetailsState),
  }),
});

export const { selectIds, selectEntities, selectAll, selectTotal } =
  tvShowsDetailsFeature;

export const selectExists = (id: TvShowId) =>
  createSelector(
    tvShowsDetailsFeature.selectEntities,
    (entities) => !!entities[id],
  );

export const selectById = (id: TvShowId) =>
  createSelector(
    tvShowsDetailsFeature.selectEntities,
    (entities): TvShowDetails | null => entities[id] ?? null,
  );

export const TvShowsDetailsSelectors = {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  selectExists,
  selectById,
};
