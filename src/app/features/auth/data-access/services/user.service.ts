import { inject, Injectable, Signal } from '@angular/core';
import { SignedInUser } from '@core/models';
import { first, map, merge, Observable, shareReplay } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { UserActions, UserSelectors } from '@features/auth/data-access/+state';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private store = inject(Store);
  private actions$ = inject(Actions);

  public user: Signal<SignedInUser | null> = this.store.selectSignal(
    UserSelectors.selectUser,
  );
  public isLoggedIn: Signal<boolean> = this.store.selectSignal(
    UserSelectors.selectIsLoggedIn,
  );
  public isGuest: Signal<boolean> = this.store.selectSignal(
    UserSelectors.selectIsGuest,
  );
  public signInError: Signal<string | undefined> = this.store.selectSignal(
    UserSelectors.selectSignInError,
  );
  public signInPending: Signal<boolean> = this.store.selectSignal(
    UserSelectors.selectIsSignInPending,
  );

  public signIn(
    login: string,
    password: string,
  ): Observable<SignedInUser | null> {
    const result$ = merge(
      this.actions$.pipe(
        ofType(UserActions.loginSuccess),
        map((action) => action.user),
      ),
      this.actions$.pipe(
        ofType(UserActions.loginFailure),
        map(() => null),
      ),
    ).pipe(first(), shareReplay(1));

    result$.subscribe();

    this.store.dispatch(
      UserActions.login({
        username: login,
        password: password,
      }),
    );

    return result$;
  }

  public signOut(): Observable<boolean> {
    const result$ = this.actions$.pipe(
      ofType(UserActions.logoutSuccess),
      map(() => true),
      first(),
      shareReplay(1),
    );
    result$.subscribe();

    this.store.dispatch(UserActions.logout());

    return result$;
  }
}
