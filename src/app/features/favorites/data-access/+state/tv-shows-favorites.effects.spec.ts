import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Subject } from 'rxjs';
import { TvShowsFavoritesEffects } from './tv-shows-favorites.effects';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TvShowsApiService } from '@core/api/tv-shows-api.service';

describe('TvShowsFavoritesEffects', () => {
  let actions$: Subject<Action>;
  let effects: TvShowsFavoritesEffects;
  let api: jasmine.SpyObj<TvShowsApiService>;

  beforeEach(() => {
    api = jasmine.createSpyObj<TvShowsApiService>(['details']);

    TestBed.configureTestingModule({
      providers: [
        TvShowsFavoritesEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
        { provide: TvShowsApiService, useValue: api },
      ],
    });

    effects = TestBed.inject(TvShowsFavoritesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
