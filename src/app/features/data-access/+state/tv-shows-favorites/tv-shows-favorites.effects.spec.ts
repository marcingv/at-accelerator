import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TvShowsFavoritesEffects } from './tv-shows-favorites.effects';

describe('TvShowsFavoritesEffects', () => {
  let actions$: Observable<any>;
  let effects: TvShowsFavoritesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TvShowsFavoritesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TvShowsFavoritesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
