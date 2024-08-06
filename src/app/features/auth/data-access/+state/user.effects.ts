import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, exhaustMap } from 'rxjs/operators';
import { catchError, map, of, tap } from 'rxjs';
import { UserActions } from './user.actions';
import { AuthApiService } from '@core/api';
import { Paths } from '@core/routing/paths';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  private readonly api: AuthApiService = inject(AuthApiService);
  private readonly router: Router = inject(Router);

  public signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.login),
      exhaustMap((action) => {
        return this.api.signIn(action.username, action.password).pipe(
          delay(2000),
          map((response) => {
            return UserActions.loginSuccess({
              user: response,
            });
          }),
          catchError((error) =>
            of(
              UserActions.loginFailure({
                username: action.username,
                error: error,
              }),
            ),
          ),
        );
      }),
    );
  });

  public logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.logout),
      map(() => {
        return UserActions.logoutSuccess();
      }),
    );
  });

  public redirectUserAfterLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.loginSuccess),
        tap(() => this.onSuccessfulUserLogin()),
      );
    },
    { dispatch: false },
  );

  public redirectUserAfterLogout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.logoutSuccess),
        tap(() => this.onSuccessfulUserLogout()),
      );
    },
    { dispatch: false },
  );

  public constructor(private actions$: Actions) {}

  private onSuccessfulUserLogin(): void {
    this.router.navigate([Paths.ROOT]);
  }

  private onSuccessfulUserLogout(): void {
    this.router.navigate([Paths.ROOT]);
  }
}
