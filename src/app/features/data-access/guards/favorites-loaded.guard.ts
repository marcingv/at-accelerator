import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
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
  tap,
} from 'rxjs';
import {
  TvShowsFavoritesActions,
  TvShowsFavoritesSelectors,
} from '@features/data-access/+state/tv-shows-favorites';
import { Actions, ofType } from '@ngrx/effects';

export const favoritesLoadedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Observable<boolean> => {
  const store = inject(Store);
  const actions$ = inject(Actions);

  return store.select(TvShowsFavoritesSelectors.selectAreAllLoaded).pipe(
    tap((areLoaded) => console.warn(areLoaded)),
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
