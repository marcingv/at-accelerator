import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { UserEffects } from './user.effects';
import { Action } from '@ngrx/store';

describe('UserEffects', () => {
  let actions$: Observable<Action>;
  let effects: UserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(UserEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
