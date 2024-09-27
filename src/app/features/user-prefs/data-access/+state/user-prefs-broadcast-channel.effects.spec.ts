import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { UserPrefsBroadcastChannelEffects } from './user-prefs-broadcast-channel.effects';
import { provideMockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';

describe('UserPrefsBroadcastChannelEffects', () => {
  let actions$: Observable<Action>;
  let effects: UserPrefsBroadcastChannelEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserPrefsBroadcastChannelEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(UserPrefsBroadcastChannelEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
