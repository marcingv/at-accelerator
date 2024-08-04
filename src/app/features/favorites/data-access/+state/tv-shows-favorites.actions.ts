import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TvShowDetails, TvShowId } from '@core/models';
import { HttpErrorResponse } from '@angular/common/http';

export const TvShowsFavoritesActions = createActionGroup({
  source: 'TvShowsFavorites',
  events: {
    'Load Favorites': emptyProps(),
    'Load Favorites Success': props<{ tvShows: TvShowDetails[] }>(),
    'Load Favorites Failure': props<{ error: HttpErrorResponse }>(),
    Set: props<{ ids: TvShowId[] }>(),
    Toggle: props<{ id: TvShowId }>(),
    Clear: emptyProps(),
    'Persist User Preferences': emptyProps(),
    'Restore User Preferences': emptyProps(),
  },
});
