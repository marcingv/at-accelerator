import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { UserPrefsActions } from '@features/user-prefs/data-access/+state/actions/user-prefs.actions';
import { concatLatestFrom } from '@ngrx/operators';
import { UserActions, UserSelectors } from '@features/auth/data-access/+state';
import { combineLatest, map, tap } from 'rxjs';
import { SignedInUser } from '@core/models';
import { State } from './user-prefs.reducer';
import { selectUserPrefsState } from './user-prefs.selectors';
import { WishlistActions } from '@features/user-prefs/data-access/+state/actions/wishlist.actions';
import { TvShowsFavoritesActions } from '@features/user-prefs/data-access/+state/actions/tv-shows-favorites.actions';
import { BrowserStorage, LocalStorageService } from '@core/storage';
import { UsersPrefsSettings } from '@features/user-prefs/data-access/+state/models/users-prefs-settings';

@Injectable()
export class UserPrefsEffects implements OnInitEffects {
  public readonly STORAGE_KEY = 'user-prefs';

  #actions$: Actions = inject(Actions);
  #store: Store = inject(Store);
  #storage: BrowserStorage = inject(LocalStorageService);

  loadSettings$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(UserPrefsActions.loadSettings),
      concatLatestFrom(() => this.#store.select(UserSelectors.selectUser)),
      map(([, user]: [Action, SignedInUser | null]) => {
        const userSettings = this.#loadUserSettings(user);

        return UserPrefsActions.set({
          state: userSettings,
        });
      }),
    );
  });

  saveSettings$ = createEffect(
    () => {
      return this.#actions$.pipe(
        ofType(UserPrefsActions.saveSettings),
        concatLatestFrom(() => {
          return combineLatest([
            this.#store.select(UserSelectors.selectUser),
            this.#store.select(selectUserPrefsState),
          ]);
        }),
        tap(([, data]): void => {
          const user = data[0];
          const userPrefs = data[1];

          this.#persistSettings(user, userPrefs);
        }),
      );
    },
    { dispatch: false },
  );

  public saveSettingsTrigger$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(
        WishlistActions.set,
        WishlistActions.toggle,
        WishlistActions.clear,
        TvShowsFavoritesActions.set,
        TvShowsFavoritesActions.toggle,
        TvShowsFavoritesActions.clear,
        UserPrefsActions.clear,
      ),
      map(() => UserPrefsActions.saveSettings()),
    );
  });

  public loadSettingsTrigger$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(UserActions.loginSuccess, UserActions.logoutSuccess),
      map(() => UserPrefsActions.loadSettings()),
    );
  });

  public ngrxOnInitEffects(): Action<string> {
    return UserPrefsActions.loadSettings();
  }

  #persistSettings(user: SignedInUser | null, userPrefs: State) {
    let settingsMap: UsersPrefsSettings | null = this.#storage.getItem(
      this.STORAGE_KEY,
    );
    if (!settingsMap) {
      settingsMap = {};
    }

    settingsMap[user?.username ?? 'guest'] = userPrefs;

    this.#storage.setItem(this.STORAGE_KEY, settingsMap);
  }

  #loadUserSettings(user: SignedInUser | null): State {
    const settingsMap: UsersPrefsSettings | null = this.#storage.getItem(
      this.STORAGE_KEY,
    );

    return (
      (settingsMap && settingsMap[user?.username ?? 'guest']) ?? {
        favoriteShowsIds: [],
        wishlistShowsIds: [],
      }
    );
  }
}
