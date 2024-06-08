import { TestBed } from '@angular/core/testing';

import { TvShowsFavouritesService } from './tv-shows-favourites.service';
import { TvShow } from '@core/models';

describe('TvShowsFavouritesService', () => {
  let service: TvShowsFavouritesService;

  const shows: TvShow[] = [
    {
      id: 1,
      status: 'Running',
      start_date: '2024-01-01',
      country: 'UK',
      name: 'Show 1',
      network: 'Network',
      permalink: 'http://localhost',
      image_thumbnail_path: 'http://localhost',
    },
    {
      id: 2,
      status: 'Running',
      start_date: '2024-01-01',
      country: 'UK',
      name: 'Show 2',
      network: 'Network',
      permalink: 'http://localhost',
      image_thumbnail_path: 'http://localhost',
    },
    {
      id: 3,
      status: 'Running',
      start_date: '2024-01-01',
      country: 'UK',
      name: 'Show 3',
      network: 'Network',
      permalink: 'http://localhost',
      image_thumbnail_path: 'http://localhost',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(TvShowsFavouritesService);
    service.clearAll();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially have empty favourites', () => {
    expect(service.listSignal()).toEqual([]);
    expect(service.idsSignal()).toEqual([]);
  });

  it('should add tv show to favourites', () => {
    const favouritesSignal = service.listSignal;
    const favouritesIdsSignal = service.idsSignal;

    expect(favouritesSignal()).toEqual([]);
    expect(favouritesIdsSignal()).toEqual([]);

    service.add(shows[0]);
    expect(favouritesSignal().length).toEqual(1);
    expect(favouritesIdsSignal().length).toEqual(1);

    service.add(shows[1]);
    expect(favouritesSignal().length).toEqual(2);
    expect(favouritesIdsSignal().length).toEqual(2);

    expect(favouritesSignal()).toEqual([shows[0], shows[1]]);
    expect(favouritesIdsSignal()).toEqual([shows[0].id, shows[1].id]);
  });

  it('should not have duplicates', () => {
    const favouritesSignal = service.listSignal;
    const favouritesIdsSignal = service.idsSignal;

    service.add(shows[0]);
    service.add(shows[0]);
    service.add(shows[0]);

    expect(favouritesSignal().length).toEqual(1);
    expect(favouritesIdsSignal().length).toEqual(1);
  });

  it('should remove tv show from favourites', () => {
    const favouritesSignal = service.listSignal;
    const favouritesIdsSignal = service.idsSignal;

    service.add(shows[1]);
    service.add(shows[2]);

    expect(favouritesSignal().length).toEqual(2);
    expect(favouritesIdsSignal().length).toEqual(2);

    service.remove(shows[2].id);

    expect(favouritesSignal().length).toEqual(1);
    expect(favouritesIdsSignal().length).toEqual(1);
  });

  it('should provide is favourite info as signal', () => {
    const isFavouriteSignal = service.isFavourite(shows[0].id);
    expect(isFavouriteSignal()).toBeFalse();

    service.add(shows[0]);
    expect(isFavouriteSignal()).toBeTrue();

    service.remove(shows[0].id);
    expect(isFavouriteSignal()).toBeFalse();
  });
});
