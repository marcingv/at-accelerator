import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { UserActions } from './user.actions';

@Injectable()
export class UserEffects {
  public signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.login),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>),
    );
  });

  public constructor(private actions$: Actions) {}
}
