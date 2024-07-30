import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TvShowsListEffects } from './tv-shows-list.effects';

describe('TvShowsListEffects', () => {
  let actions$: Observable<any>;
  let effects: TvShowsListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TvShowsListEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TvShowsListEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
