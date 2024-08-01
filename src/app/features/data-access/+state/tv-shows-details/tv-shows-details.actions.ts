import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { TvShowDetails, TvShowId } from '@core/models';

export const TvShowsDetailsActions = createActionGroup({
  source: 'TvShowsDetails/API',
  events: {
    Load: props<{ models: TvShowDetails[] }>(),
    Add: props<{ model: TvShowDetails }>(),
    Upsert: props<{ model: TvShowDetails }>(),
    'Add Many': props<{ models: TvShowDetails[] }>(),
    'Upsert Many': props<{ models: TvShowDetails[] }>(),
    Update: props<{ model: Update<TvShowDetails> }>(),
    'Update Many': props<{ models: Update<TvShowDetails>[] }>(),
    Delete: props<{ id: TvShowId }>(),
    'Delete Many': props<{ ids: TvShowId[] }>(),
    Clear: emptyProps(),
  },
});
