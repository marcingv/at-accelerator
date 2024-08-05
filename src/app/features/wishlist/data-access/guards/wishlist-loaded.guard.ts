import { CanActivateFn } from '@angular/router';
import { first, map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  WishlistActions,
  WishlistSelectors,
} from '@features/wishlist/data-access/+state';
import { Actions, ofType } from '@ngrx/effects';

export const wishlistLoadedGuard: CanActivateFn = (): Observable<boolean> => {
  const store = inject(Store);
  const actions$ = inject(Actions);

  return store.select(WishlistSelectors.selectAreWishlistEntitiesLoaded).pipe(
    first(),
    switchMap((areLoaded: boolean) => {
      if (areLoaded) {
        return of(true);
      }

      const result$ = actions$.pipe(
        ofType(WishlistActions.loadSuccess, WishlistActions.loadFailure),
        first(),
        shareReplay(1),
      );

      result$.subscribe();
      store.dispatch(WishlistActions.load());

      return result$.pipe(map(() => true));
    }),
  );
};
