import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersBroadcastChannelService } from '@features/auth/data-access/broadcast-channel/users-broadcast-channel.service';
import { UserActions } from '@features/auth/data-access/+state/user.actions';
import { tap } from 'rxjs';
import { UsersEvent } from '@features/auth/data-access/broadcast-channel/users-events';

@Injectable()
export class UserBroadcastChannelEffects {
  #actions$ = inject(Actions);
  #broadcastChannel = inject(UsersBroadcastChannelService);

  eventsReceiver$ = createEffect(
    () => {
      return this.#broadcastChannel.messages$.pipe(
        tap((event) => this.#handleEvent(event)),
      );
    },
    { dispatch: false },
  );

  userLoginEventEmitter$ = createEffect(
    () => {
      return this.#actions$.pipe(
        ofType(UserActions.loginSuccess),
        tap((action) =>
          this.#broadcastChannel.postMessage({
            type: 'user-signed-in',
            user: action.user,
          }),
        ),
      );
    },
    { dispatch: false },
  );

  userLogoutEventEmitter$ = createEffect(
    () => {
      return this.#actions$.pipe(
        ofType(UserActions.logoutSuccess),
        tap(() =>
          this.#broadcastChannel.postMessage({
            type: 'user-signed-out',
          }),
        ),
      );
    },
    { dispatch: false },
  );

  #handleEvent(event: MessageEvent<UsersEvent>): void {
    const userEvent: UsersEvent = event.data;

    if (userEvent.type === 'user-signed-in') {
      this.#handleUserSignedInEvent();
    } else if (userEvent.type === 'user-signed-out') {
      this.#handleUserSignedOutEvent();
    }
  }

  #handleUserSignedInEvent(): void {
    window.location.reload();
  }

  #handleUserSignedOutEvent(): void {
    window.location.reload();
  }
}
