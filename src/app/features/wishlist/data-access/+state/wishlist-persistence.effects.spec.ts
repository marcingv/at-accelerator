import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { WishlistPersistenceEffects } from './wishlist-persistence.effects';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('WishlistPersistenceEffects', () => {
  let actions$: Observable<Action>;
  let effects: WishlistPersistenceEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WishlistPersistenceEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(WishlistPersistenceEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
