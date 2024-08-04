import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { TvShowsListEffects } from './tv-shows-list.effects';
import { Actions } from '@ngrx/effects';
import { TvShowsApiService } from '@core/api/tv-shows-api.service';

describe('TvShowsListEffects', () => {
  let actions$: Observable<Actions>;
  let effects: TvShowsListEffects;
  let api: jasmine.SpyObj<TvShowsApiService>;

  beforeEach(() => {
    api = jasmine.createSpyObj<TvShowsApiService>(['search', 'popularList']);

    TestBed.configureTestingModule({
      providers: [
        TvShowsListEffects,
        provideMockActions(() => actions$),
        {
          provide: TvShowsApiService,
          useValue: api,
        },
      ],
    });

    effects = TestBed.inject(TvShowsListEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
