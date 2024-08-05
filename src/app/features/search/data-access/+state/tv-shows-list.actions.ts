import { createActionGroup, props } from '@ngrx/store';
import { TvShowId } from '@core/models';
import { HttpErrorResponse } from '@angular/common/http';

export const TvShowsListActions = createActionGroup({
  source: 'TvShowsList',
  events: {
    'Load Page': props<{ query: string | undefined; page: number }>(),
    'Load Page Success': props<{
      query: string | undefined;
      page: number;
      pages: number;
      total: number;
      ids: TvShowId[];
    }>(),
    'Load Page Failure': props<{ error: HttpErrorResponse }>(),
  },
});
