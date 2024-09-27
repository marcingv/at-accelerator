import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserPrefsBroadcastChannelService } from '@features/user-prefs/data-access/broadcast-channel/user-prefs-broadcast-channel.service';
import { WishlistActions } from '@features/user-prefs/data-access/+state/actions/wishlist.actions';
import { TvShowsFavoritesActions } from '@features/user-prefs/data-access/+state/actions/tv-shows-favorites.actions';
import { UserPrefsActions } from '@features/user-prefs/data-access/+state/actions/user-prefs.actions';
import { tap } from 'rxjs';
import { UserPrefsChanged } from '@features/user-prefs/data-access/broadcast-channel/users-prefs-events';
import { Store } from '@ngrx/store';
import { delay } from 'rxjs/operators';

@Injectable()
export class UserPrefsBroadcastChannelEffects {
  #actions$ = inject(Actions);
  #store = inject(Store);
  #broadcastChannel = inject(UserPrefsBroadcastChannelService);

  public prefsChangedEventTrigger$ = createEffect(
    () => {
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
        delay(0),
        tap(() => {
          this.#broadcastChannel.postMessage({ type: 'user-prefs-changed' });
        }),
      );
    },
    { dispatch: false },
  );

  eventsReceiver$ = createEffect(
    () => {
      return this.#broadcastChannel.messages$.pipe(
        tap((event) => this.#handleEvent(event)),
      );
    },
    { dispatch: false },
  );

  #handleEvent(event: MessageEvent<UserPrefsChanged>): void {
    const prefsEvent = event.data;

    if (prefsEvent.type === 'user-prefs-changed') {
      this.#handleUserPrefsChangedEvent();
    }
  }

  #handleUserPrefsChangedEvent(): void {
    this.#store.dispatch(UserPrefsActions.loadSettings());
  }
}
