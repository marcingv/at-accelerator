import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Subject } from 'rxjs';
import { TvShowEffects } from './tv-show.effects';
import { Action } from '@ngrx/store';

describe('TvShowEffects', () => {
  let actions$: Subject<Action>;
  let effects: TvShowEffects;

  beforeEach(() => {
    actions$ = new Subject<Action>();

    TestBed.configureTestingModule({
      providers: [TvShowEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(TvShowEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
