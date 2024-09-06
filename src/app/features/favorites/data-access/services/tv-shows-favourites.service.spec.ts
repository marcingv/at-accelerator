import { TestBed } from '@angular/core/testing';

import { TvShowsFavouritesService } from './tv-shows-favourites.service';
import { TvShowDetails } from '@core/models';
import { TvShowDetailsFactory } from '@testing/factories';
import { provideEffects } from '@ngrx/effects';
import { provideStore, Store } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  fromTvShowsDetails,
  TvShowsDetailsActions,
} from '@features/tv-shows/data-access/+state/tv-shows-details';
import { TvShowsFavoritesEffects } from '@features/favorites/data-access/+state';
import { fromUserPrefs } from '@features/user-prefs/data-access/+state';

describe('TvShowsFavouritesService', () => {
  let service: TvShowsFavouritesService;

  const shows: TvShowDetails[] = [
    TvShowDetailsFactory.createInstance({
      id: 1,
      status: 'Running',
      start_date: '2024-01-01',
      country: 'UK',
      name: 'Show 1',
      network: 'Network',
      permalink: 'http://localhost',
      image_thumbnail_path: 'http://localhost',
    }),
    TvShowDetailsFactory.createInstance({
      id: 2,
      status: 'Running',
      start_date: '2024-01-01',
      country: 'UK',
      name: 'Show 2',
      network: 'Network',
      permalink: 'http://localhost',
      image_thumbnail_path: 'http://localhost',
    }),
    TvShowDetailsFactory.createInstance({
      id: 3,
      status: 'Running',
      start_date: '2024-01-01',
      country: 'UK',
      name: 'Show 3',
      network: 'Network',
      permalink: 'http://localhost',
      image_thumbnail_path: 'http://localhost',
    }),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideStore({
          [fromTvShowsDetails.tvShowsDetailsFeatureKey]:
            fromTvShowsDetails.reducer,
          [fromUserPrefs.userPrefsFeatureKey]: fromUserPrefs.reducer,
        }),
        provideEffects(TvShowsFavoritesEffects),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(TvShowsFavouritesService);
    service.clearAll();

    const store = TestBed.inject(Store);
    store.dispatch(
      TvShowsDetailsActions.addMany({
        models: shows,
      }),
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially have empty favourites', () => {
    expect(service.favorites()).toEqual([]);
    expect(service.idsSignal()).toEqual([]);
  });

  it('should add tv show to favourites', () => {
    const favouritesSignal = service.favorites;
    const favouritesIdsSignal = service.idsSignal;

    expect(favouritesSignal()).toEqual([]);
    expect(favouritesIdsSignal()).toEqual([]);

    service.toggle(shows[0]);
    expect(favouritesSignal().length).toEqual(1);
    expect(favouritesIdsSignal().length).toEqual(1);

    service.toggle(shows[1]);
    expect(favouritesSignal().length).toEqual(2);
    expect(favouritesIdsSignal().length).toEqual(2);

    expect(favouritesSignal()).toEqual([shows[0], shows[1]]);
    expect(favouritesIdsSignal()).toEqual([shows[0].id, shows[1].id]);
  });

  it('should not have duplicates', () => {
    const favouritesSignal = service.favorites;
    const favouritesIdsSignal = service.idsSignal;

    service.toggle(shows[0]);
    service.toggle(shows[0]);
    service.toggle(shows[0]);

    expect(favouritesSignal().length).toEqual(1);
    expect(favouritesIdsSignal().length).toEqual(1);
  });

  it('should remove tv show from favourites', () => {
    const favouritesSignal = service.favorites;
    const favouritesIdsSignal = service.idsSignal;

    service.toggle(shows[1]);
    service.toggle(shows[2]);

    expect(favouritesSignal().length).toEqual(2);
    expect(favouritesIdsSignal().length).toEqual(2);

    service.toggle(shows[2]);

    expect(favouritesSignal().length).toEqual(1);
    expect(favouritesIdsSignal().length).toEqual(1);
  });

  it('should provide is favourite info as signal', () => {
    const isFavouriteSignal = service.isFavourite(shows[0].id);
    expect(isFavouriteSignal()).toBeFalse();

    service.toggle(shows[0]);
    expect(isFavouriteSignal()).toBeTrue();

    service.toggle(shows[0]);
    expect(isFavouriteSignal()).toBeFalse();
  });
});
