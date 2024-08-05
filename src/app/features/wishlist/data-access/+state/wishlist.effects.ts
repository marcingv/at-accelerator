import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WishlistActions } from '@features/wishlist/data-access/+state/wishlist.actions';
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
import { concatLatestFrom } from '@ngrx/operators';
import { Action, Store } from '@ngrx/store';
import { WishlistSelectors } from '@features/wishlist/data-access/+state/index';
import { TvShowDetails, TvShowDetailsResponse, TvShowId } from '@core/models';
import { TvShowsApiService } from '@core/api/tv-shows-api.service';
import { TvShowActions } from '@features/tv-shows/data-access/+state/tv-shows';

@Injectable()
export class WishlistEffects {
  private api = inject(TvShowsApiService);

  public loadWishlist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WishlistActions.load),
      concatLatestFrom(() =>
        this.store.select(WishlistSelectors.selectWishlistIds),
      ),
      exhaustMap(([, idsToLoad]: [Action, TvShowId[]]) => {
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
            const models: TvShowDetails[] = results.filter(
              (oneTvShow) => !!oneTvShow,
            ) as TvShowDetails[];

            return concat(
              of(TvShowActions.addTvShows({ tvShows: models })),
              of(
                WishlistActions.loadSuccess({
                  models: models,
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
  ) {}
}
