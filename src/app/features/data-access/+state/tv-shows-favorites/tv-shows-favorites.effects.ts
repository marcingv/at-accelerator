import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  TvShowsFavoritesActions,
  TvShowsFavoritesSelectors,
} from '@features/data-access/+state/tv-shows-favorites';
import {
  catchError,
  concat,
  exhaustMap,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { TvShowsApiService } from '@core/api/tv-shows-api.service';
import { Action, Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/operators';
import { TvShowDetails, TvShowDetailsResponse, TvShowId } from '@core/models';
import { TvShowsDetailsActions } from '@features/data-access/+state/tv-shows-details';

@Injectable()
export class TvShowsFavoritesEffects {
  public loadFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TvShowsFavoritesActions.loadFavorites),
      concatLatestFrom(() =>
        this.store.select(TvShowsFavoritesSelectors.selectNotLoadedIds),
      ),
      exhaustMap(([, idsToLoad]: [Action, TvShowId[]]) => {
        console.warn(idsToLoad);

        const requests$: Array<Observable<TvShowDetails | null>> = [];
        idsToLoad.forEach((oneId: TvShowId) =>
          requests$.push(
            this.api.details(oneId).pipe(
              map((response: TvShowDetailsResponse) => response.tvShow ?? null),
              catchError(() => of(null)),
            ),
          ),
        );

        return forkJoin(requests$).pipe(
          switchMap((results: Array<TvShowDetails | null>) => {
            console.warn('zaladowalem', results);

            const models: TvShowDetails[] = results.filter(
              (oneTvShow) => !!oneTvShow,
            ) as TvShowDetails[];

            return concat(
              of(TvShowsDetailsActions.addMany({ models: models })),
              of(
                TvShowsFavoritesActions.loadFavoritesSuccess({
                  tvShows: models,
                }),
              ),
            );
          }),
        );
      }),
    );
  });

  public constructor(
    private actions$: Actions,
    private store: Store,
    private api: TvShowsApiService,
  ) {}
}
