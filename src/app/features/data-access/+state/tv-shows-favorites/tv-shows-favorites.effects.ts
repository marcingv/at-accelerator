import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { TvShowsFavoritesActions } from '@features/data-access/+state/tv-shows-favorites/tv-shows-favorites.actions';
import { map, tap } from 'rxjs';

@Injectable()
export class TvShowsFavoritesEffects {
  public onAppInit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => TvShowsFavoritesActions.restoreUserPreferences()),
    );
  });

  public restoreUserPrefs$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TvShowsFavoritesActions.restoreUserPreferences),
        tap(() => {
          console.warn('restore user prefs');
        }),
      );
    },
    { dispatch: false },
  );

  public constructor(private actions$: Actions) {}
}
