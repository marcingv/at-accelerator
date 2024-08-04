import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Subject } from 'rxjs';
import { TvShowsDetailsEffects } from './tv-shows-details.effects';
import { Action } from '@ngrx/store';
import { TvShowsApiService } from '@core/api/tv-shows-api.service';

describe('TvShowsDetailsEffects', () => {
  let actions$: Subject<Action>;
  let effects: TvShowsDetailsEffects;
  let api: jasmine.SpyObj<TvShowsApiService>;

  beforeEach(() => {
    actions$ = new Subject<Action>();
    api = jasmine.createSpyObj<TvShowsApiService>(['details']);

    TestBed.configureTestingModule({
      providers: [
        TvShowsDetailsEffects,
        provideMockActions(() => actions$),
        { provide: TvShowsApiService, useValue: api },
      ],
    });

    effects = TestBed.inject(TvShowsDetailsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
