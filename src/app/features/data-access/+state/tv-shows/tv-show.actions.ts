import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { TvShow } from '@core/models';

export const TvShowActions = createActionGroup({
  source: 'TvShow/API',
  events: {
    'Add TvShow': props<{ tvShow: TvShow }>(),
    'Upsert TvShow': props<{ tvShow: TvShow }>(),
    'Add TvShows': props<{ tvShows: TvShow[] }>(),
    'Upsert TvShows': props<{ tvShows: TvShow[] }>(),
    'Update TvShow': props<{ tvShow: Update<TvShow> }>(),
    'Update TvShows': props<{ tvShows: Update<TvShow>[] }>(),
    'Delete TvShow': props<{ id: string }>(),
    'Delete TvShows': props<{ ids: string[] }>(),
    'Clear TvShows': emptyProps(),
  },
});
