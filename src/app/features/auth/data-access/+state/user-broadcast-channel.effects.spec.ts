import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { UserBroadcastChannelEffects } from './user-broadcast-channel.effects';
import { Action } from '@ngrx/store';

describe('UserBroadcastChannelEffects', () => {
  let actions$: Observable<Action>;
  let effects: UserBroadcastChannelEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserBroadcastChannelEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(UserBroadcastChannelEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
