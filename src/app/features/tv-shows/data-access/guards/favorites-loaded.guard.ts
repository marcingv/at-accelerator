import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  first,
  map,
  merge,
  Observable,
  of,
  shareReplay,
  switchMap,
} from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import {
  TvShowsFavoritesActions,
  TvShowsFavoritesSelectors,
} from '@features/tv-shows/data-access/+state/tv-shows-favorites';

export const favoritesLoadedGuard: CanActivateFn = (): Observable<boolean> => {
  const store = inject(Store);
  const actions$ = inject(Actions);

  return store.select(TvShowsFavoritesSelectors.selectAreAllLoaded).pipe(
    switchMap((areLoaded) => {
      if (areLoaded) {
        return of(true);
      }

      const result$ = merge(
        actions$.pipe(ofType(TvShowsFavoritesActions.loadFavoritesSuccess)),
        actions$.pipe(ofType(TvShowsFavoritesActions.loadFavoritesFailure)),
      ).pipe(first(), shareReplay(1));

      result$.subscribe();
      store.dispatch(TvShowsFavoritesActions.loadFavorites());

      return result$;
    }),
    map(() => true),
  );
};
