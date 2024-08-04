import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { WishlistEffects } from './wishlist.effects';
import { Action } from '@ngrx/store';

describe('WishlistEffects', () => {
  let actions$: Observable<Action>;
  let effects: WishlistEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WishlistEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(WishlistEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
