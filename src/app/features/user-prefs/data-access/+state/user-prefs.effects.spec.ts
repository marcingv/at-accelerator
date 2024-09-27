import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs';
import { UserPrefsEffects } from './user-prefs.effects';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('UserPrefsEffects', () => {
  let actions$: ReplaySubject<Action>;
  let effects: UserPrefsEffects;

  beforeEach(() => {
    actions$ = new ReplaySubject<Action>();

    TestBed.configureTestingModule({
      providers: [
        UserPrefsEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(UserPrefsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
