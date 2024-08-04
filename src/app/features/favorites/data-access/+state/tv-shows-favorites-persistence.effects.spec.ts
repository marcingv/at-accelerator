import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { TvShowsFavoritesPersistenceEffects } from './tv-shows-favorites-persistence.effects';
import { provideMockStore } from '@ngrx/store/testing';

describe('TvShowsFavoritesPersistenceEffects', () => {
  let actions$: Observable<unknown>;
  let effects: TvShowsFavoritesPersistenceEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TvShowsFavoritesPersistenceEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(TvShowsFavoritesPersistenceEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
