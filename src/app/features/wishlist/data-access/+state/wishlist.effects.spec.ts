import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { WishlistEffects } from './wishlist.effects';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TvShowsApiService } from '@core/api/tv-shows-api.service';

describe('WishlistEffects', () => {
  let actions$: Observable<Action>;
  let effects: WishlistEffects;
  let api: jasmine.SpyObj<TvShowsApiService>;

  beforeEach(() => {
    api = jasmine.createSpyObj<TvShowsApiService>(['search']);

    TestBed.configureTestingModule({
      providers: [
        WishlistEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: TvShowsApiService, useValue: api },
      ],
    });

    effects = TestBed.inject(WishlistEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
