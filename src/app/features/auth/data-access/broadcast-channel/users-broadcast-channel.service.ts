import { Injectable } from '@angular/core';
import { UsersEvent } from '@features/auth/data-access/broadcast-channel/users-events';
import { fromEvent, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersBroadcastChannelService {
  #channel: BroadcastChannel = new BroadcastChannel('users-events-channel');

  messages$: Observable<MessageEvent<UsersEvent>> = fromEvent(
    this.#channel,
    'message',
  ) as Observable<MessageEvent<UsersEvent>>;

  public postMessage(event: UsersEvent): void {
    this.#channel.postMessage(event);
  }
}
