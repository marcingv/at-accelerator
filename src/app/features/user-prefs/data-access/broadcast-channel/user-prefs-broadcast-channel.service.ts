import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { UserPrefsChanged } from './users-prefs-events';

@Injectable({
  providedIn: 'root',
})
export class UserPrefsBroadcastChannelService {
  #channel: BroadcastChannel = new BroadcastChannel('users-events-channel');

  messages$: Observable<MessageEvent<UserPrefsChanged>> = fromEvent(
    this.#channel,
    'message',
  ) as Observable<MessageEvent<UserPrefsChanged>>;

  public postMessage(event: UserPrefsChanged): void {
    this.#channel.postMessage(event);
  }
}
