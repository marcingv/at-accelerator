import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TvShowEffects } from './tv-show.effects';

describe('TvShowEffects', () => {
  let actions$: Observable<any>;
  let effects: TvShowEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TvShowEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TvShowEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
