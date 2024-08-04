import { TestBed } from '@angular/core/testing';
import { TvShowsListProviderService } from './tv-shows-list-provider.service';
import {
  fromTvShowsList,
  TvShowsListActions,
} from '@features/data-access/+state/tv-shows-list';
import { TvShowsListStateFactory, TvShowsStateFactory } from '@testing/store';
import { fromTvShows } from '@features/data-access/+state/tv-shows';
import { TvShowDetailsFactory } from '@testing/factories';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { tvShowsListFeatureKey } from '@features/data-access/+state/tv-shows-list/tv-shows-list.reducer';

describe('TvShowsListProviderService', () => {
  let service: TvShowsListProviderService;
  let store: MockStore;

  const STATE: {
    [fromTvShows.tvShowsFeatureKey]: fromTvShows.State;
    [fromTvShowsList.tvShowsListFeatureKey]: fromTvShowsList.State;
  } = {
    tvShows: TvShowsStateFactory.createInstance({
      ids: [1, 2],
      entities: {
        1: TvShowDetailsFactory.createInstance({ id: 1 }),
        2: TvShowDetailsFactory.createInstance({ id: 2 }),
      },
    }),
    tvShowsList: TvShowsListStateFactory.createInstance({
      ids: [1, 2],
      pages: 1,
      total: 2,
      page: 1,
      query: undefined,
      isLoading: false,
    }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: STATE })],
    });

    store = TestBed.inject(MockStore);
    service = TestBed.inject(TvShowsListProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide collection data', () => {
    expect(service.filterQuery()).toBeFalsy();
    expect(service.currentPage()).toEqual(STATE[tvShowsListFeatureKey].page);
    expect(service.totalPages()).toEqual(STATE[tvShowsListFeatureKey].pages);
    expect(service.tvShows()).toBeTruthy();
    expect(service.tvShows()).toBeInstanceOf(Array);
    expect(service.tvShows().length).toEqual(
      STATE[tvShowsListFeatureKey].ids.length,
    );
  });

  it('should dispatch load action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    service.search('query', 2);

    expect(dispatchSpy).toHaveBeenCalledWith(
      TvShowsListActions.loadPage({
        query: 'query',
        page: 2,
      }),
    );
  });
});
