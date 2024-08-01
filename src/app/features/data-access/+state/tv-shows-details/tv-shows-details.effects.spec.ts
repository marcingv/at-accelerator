import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TvShowsDetailsEffects } from './tv-shows-details.effects';

describe('TvShowsDetailsEffects', () => {
  let actions$: Observable<any>;
  let effects: TvShowsDetailsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TvShowsDetailsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TvShowsDetailsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
