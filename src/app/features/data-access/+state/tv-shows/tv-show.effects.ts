import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { TvShowActions } from './tv-show.actions';

@Injectable()
export class TvShowEffects {
  loadTvShows$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TvShowActions.loadTvShows),
        // concatMap(() =>
        //   /** An EMPTY observable only emits completion. Replace with your own observable API request */
        //   EMPTY.pipe(
        //     map((data) => TvShowActions.loadTvShowsSuccess({ data })),
        //     catchError((error) =>
        //       of(TvShowActions.loadTvShowsFailure({ error })),
        //     ),
        //   ),
        // ),
      );
    },
    { dispatch: false },
  );

  constructor(private actions$: Actions) {}
}
