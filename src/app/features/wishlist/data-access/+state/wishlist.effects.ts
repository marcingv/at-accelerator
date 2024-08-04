import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WishlistActions } from '@features/wishlist/data-access/+state/wishlist.actions';
import { of, switchMap } from 'rxjs';

@Injectable()
export class WishlistEffects {
  loadWishlist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WishlistActions.load),
      switchMap(() => {
        // TODO: Load wishlist entities
        return of(WishlistActions.loadSuccess({ models: [] }));
      }),
    );
  });

  public constructor(private actions$: Actions) {}
}
