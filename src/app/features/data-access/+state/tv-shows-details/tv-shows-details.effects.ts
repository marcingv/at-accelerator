import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TvShowsApiService } from '@core/api/tv-shows-api.service';
import { TvShowsDetailsActions } from '@features/data-access/+state/tv-shows-details/tv-shows-details.actions';
import { catchError, concat, exhaustMap, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class TvShowsDetailsEffects {
  public load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TvShowsDetailsActions.load),
      exhaustMap((action) => {
        return this.api.details(action.id).pipe(
          switchMap((result) =>
            concat(
              of(TvShowsDetailsActions.add({ model: result.tvShow })),
              of(
                TvShowsDetailsActions.loadSuccess({
                  id: action.id,
                  model: result.tvShow,
                }),
              ),
            ),
          ),
          catchError((err: HttpErrorResponse) =>
            of(
              TvShowsDetailsActions.loadFailure({ id: action.id, error: err }),
            ),
          ),
        );
      }),
    );
  });

  public constructor(
    private actions$: Actions,
    private api: TvShowsApiService,
  ) {}
}
