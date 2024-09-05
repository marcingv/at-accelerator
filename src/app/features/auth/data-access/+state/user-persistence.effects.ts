import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { BrowserStorage, LocalStorageService } from '@core/storage';
import { UserActions } from '@features/auth/data-access/+state/user.actions';
import { map, tap } from 'rxjs';
import { SignedInUser } from '@core/models';
import { Action } from '@ngrx/store';

@Injectable()
export class UserPersistenceEffects implements OnInitEffects {
  public readonly STORAGE_KEY = 'signed-user';

  private actions$: Actions = inject(Actions);
  private storage: BrowserStorage = inject(LocalStorageService);

  public rememberSignedUser = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.loginSuccess),
        tap((user) => this.saveUser(user.user)),
      );
    },
    { dispatch: false },
  );

  public clearSignedUser = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.logoutSuccess),
        tap(() => this.clearSavedUser()),
      );
    },
    { dispatch: false },
  );

  public restoreRememberedUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.restoreRememberedUser),
      map(() => {
        const user = this.getRememberedUser();
        if (user) {
          return UserActions.loginSuccess({ user: user });
        } else {
          return UserActions.noRememberedUser();
        }
      }),
    );
  });

  private saveUser(user: SignedInUser): void {
    this.storage.setItem(this.STORAGE_KEY, user);
  }

  private clearSavedUser(): void {
    this.storage.clearItem(this.STORAGE_KEY);
  }

  private getRememberedUser(): SignedInUser | null {
    return this.storage.getItem<SignedInUser>(this.STORAGE_KEY);
  }

  public ngrxOnInitEffects(): Action {
    return UserActions.restoreRememberedUser();
  }
}
