import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { WishlistActions } from '@features/wishlist/data-access/+state/wishlist.actions';
import { BrowserStorage, LocalStorageService } from '@core/storage';
import { TvShowId } from '@core/models';
import { map } from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';
import { WishlistSelectors } from '@features/wishlist/data-access/+state/index';

@Injectable()
export class WishlistPersistenceEffects implements OnInitEffects {
  private readonly WISHLIST_STORAGE_KEY = 'wishlist';

  private readonly storage: BrowserStorage = inject(LocalStorageService);

  public restoreSettings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WishlistActions.restoreUserPreferences),
      map(() => WishlistActions.set({ ids: this.getPersistedSettings() })),
    );
  });

  public saveSettings$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          WishlistActions.toggle,
          WishlistActions.clear,
          WishlistActions.set,
        ),
        concatLatestFrom(() =>
          this.store.select(WishlistSelectors.selectWishlistIds),
        ),
        map(([, ids]: [Action, TvShowId[]]) => this.persistSettings(ids)),
      );
    },
    { dispatch: false },
  );

  public constructor(
    private actions$: Actions,
    private store: Store,
  ) {}

  public ngrxOnInitEffects(): Action<string> {
    return WishlistActions.restoreUserPreferences();
  }

  private persistSettings(ids: TvShowId[]): void {
    this.storage.setItem(this.WISHLIST_STORAGE_KEY, ids);
  }

  private getPersistedSettings(): TvShowId[] {
    return this.storage.getItem<TvShowId[]>(this.WISHLIST_STORAGE_KEY) ?? [];
  }
}
