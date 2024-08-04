import { concatLatestFrom } from '@ngrx/operators';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { TvShowsFavoritesActions } from '@features/data-access/+state/tv-shows-favorites/tv-shows-favorites.actions';
import { map, tap } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { TvShowsFavoritesSelectors } from '@features/data-access/+state/tv-shows-favorites/index';
import { TvShowId } from '@core/models';
import { BrowserStorage, LocalStorageService } from '@core/storage';

@Injectable()
export class TvShowsFavoritesPersistenceEffects implements OnInitEffects {
  private readonly STORAGE_KEY = 'tv-shows-favorites';

  private storage: BrowserStorage = inject(LocalStorageService);

  public restoreUserPrefs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TvShowsFavoritesActions.restoreUserPreferences),
      map(() => {
        const ids: TvShowId[] = this.readPersistedUserPreferences();

        return TvShowsFavoritesActions.set({ ids: ids });
      }),
    );
  });

  public persistUserPrefs$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TvShowsFavoritesActions.toggle, TvShowsFavoritesActions.clear),
        concatLatestFrom(() =>
          this.store.select(TvShowsFavoritesSelectors.selectIds),
        ),
        tap(([, ids]: [Action, TvShowId[]]) => {
          this.persistUserPreferences(ids);
        }),
      );
    },
    { dispatch: false },
  );

  public constructor(
    private actions$: Actions,
    private store: Store,
  ) {}

  public ngrxOnInitEffects(): Action<string> {
    return TvShowsFavoritesActions.restoreUserPreferences();
  }

  private persistUserPreferences(ids: TvShowId[]): void {
    this.storage.setItem(this.STORAGE_KEY, ids);
  }

  private readPersistedUserPreferences(): TvShowId[] {
    return this.storage.getItem<TvShowId[]>(this.STORAGE_KEY) ?? [];
  }
}
