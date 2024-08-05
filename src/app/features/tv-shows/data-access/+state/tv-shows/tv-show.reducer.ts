import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TvShowActions } from './tv-show.actions';
import { TvShow } from '@core/models';

export const tvShowsFeatureKey = 'tvShows';

export interface State extends EntityState<TvShow> {
  // additional entities state properties
}

export const adapter: EntityAdapter<TvShow> = createEntityAdapter<TvShow>({
  selectId: (model: TvShow) => model.id,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(TvShowActions.addTvShow, (state, action) =>
    adapter.addOne(action.tvShow, state),
  ),
  on(TvShowActions.upsertTvShow, (state, action) =>
    adapter.upsertOne(action.tvShow, state),
  ),
  on(TvShowActions.addTvShows, (state, action) =>
    adapter.addMany(action.tvShows, state),
  ),
  on(TvShowActions.upsertTvShows, (state, action) =>
    adapter.upsertMany(action.tvShows, state),
  ),
  on(TvShowActions.updateTvShow, (state, action) =>
    adapter.updateOne(action.tvShow, state),
  ),
  on(TvShowActions.updateTvShows, (state, action) =>
    adapter.updateMany(action.tvShows, state),
  ),
  on(TvShowActions.deleteTvShow, (state, action) =>
    adapter.removeOne(action.id, state),
  ),
  on(TvShowActions.deleteTvShows, (state, action) =>
    adapter.removeMany(action.ids, state),
  ),
  on(TvShowActions.clearTvShows, (state) => adapter.removeAll(state)),
);

export const tvShowsFeature = createFeature({
  name: tvShowsFeatureKey,
  reducer,
  extraSelectors: ({ selectTvShowsState }) => ({
    ...adapter.getSelectors(selectTvShowsState),
  }),
});

export const { selectIds, selectEntities, selectAll, selectTotal } =
  tvShowsFeature;
