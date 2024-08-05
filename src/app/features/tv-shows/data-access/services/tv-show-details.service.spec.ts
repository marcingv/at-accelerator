import { TestBed } from '@angular/core/testing';
import { TvShowDetailsService } from './tv-show-details.service';
import { TvShowDetails, TvShowId } from '@core/models';
import {
  catchError,
  first,
  firstValueFrom,
  lastValueFrom,
  Subject,
  tap,
} from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { TvShowsDetailsStateFactory } from '@testing/store/tv-shows-details-state.factory';
import { TvShowDetailsFactory } from '@testing/factories';
import {
  fromTvShowsDetails,
  TvShowsDetailsActions,
} from '@features/tv-shows/data-access/+state/tv-shows-details';

describe('TvShowDetailsService', () => {
  let service: TvShowDetailsService;
  let store: MockStore;
  let actions$: Subject<Action>;

  const INITIAL_STATE: {
    [fromTvShowsDetails.tvShowsDetailsFeatureKey]: fromTvShowsDetails.State;
  } = {
    tvShowsDetails: TvShowsDetailsStateFactory.createInstance({
      ids: [],
      entities: {},
    }),
  };

  beforeEach(() => {
    actions$ = new Subject<Action>();

    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState: INITIAL_STATE }),
        provideMockActions(() => actions$),
      ],
    });

    store = TestBed.inject(MockStore);
    service = TestBed.inject(TvShowDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially have details', async () => {
    const details: TvShowDetails[] = await firstValueFrom(service.getAll());

    expect(details.length).toEqual(0);
  });

  describe('Loading details', () => {
    it('should dispatch load action when details are not yet loaded', (done) => {
      const id: TvShowId = 123;
      const loadedDetailsAction = TvShowsDetailsActions.loadSuccess({
        id: id,
        model: TvShowDetailsFactory.createInstance({ id: id }),
      });
      const dispatchSpy = spyOn(store, 'dispatch');

      let details: TvShowDetails | null = null;
      service
        .getDetails(id)
        .pipe(
          first(),
          tap((model) => {
            details = model;

            expect(details).toBeTruthy();
            expect(details?.id).toEqual(id);
            expect(dispatchSpy).toHaveBeenCalledWith(
              TvShowsDetailsActions.load({
                id: id,
              }),
            );

            done();
          }),
          catchError(() => {
            done.fail();

            throw new Error('Load details failed');
          }),
        )
        .subscribe();

      const state: {
        [fromTvShowsDetails.tvShowsDetailsFeatureKey]: fromTvShowsDetails.State;
      } = {
        tvShowsDetails: TvShowsDetailsStateFactory.createInstance({
          ids: [id],
          entities: { [id]: loadedDetailsAction.model },
        }),
      };
      store.setState(state);
      actions$.next(loadedDetailsAction);
    });

    it('should not dispatch load action when details are already loaded', async () => {
      const id: TvShowId = 123;
      const state: {
        [fromTvShowsDetails.tvShowsDetailsFeatureKey]: fromTvShowsDetails.State;
      } = {
        tvShowsDetails: TvShowsDetailsStateFactory.createInstance({
          ids: [id],
          entities: { [id]: TvShowDetailsFactory.createInstance({ id: id }) },
        }),
      };
      store.setState(state);

      const dispatchSpy = spyOn(store, 'dispatch');
      const details = await lastValueFrom(service.getDetails(id).pipe(first()));

      expect(details).toBeTruthy();
      expect(details!.id).toEqual(id);
      expect(dispatchSpy).not.toHaveBeenCalled();
    });
  });
});
