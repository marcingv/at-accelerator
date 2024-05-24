import { TestBed } from '@angular/core/testing';
import { TvShowsApiService } from './tv-shows-api.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
  TestRequest,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TvShowsPagedCollectionResponse } from '@core/models';

describe('TvShowsApiService', () => {
  let service: TvShowsApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TvShowsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search tv shows', (): void => {
    const searchQuery = 'phrase';
    const expectedRequestUrl = `https://www.episodate.com/api/search?q=${searchQuery}`;
    const expectedResponseData: TvShowsPagedCollectionResponse = {
      total: '1',
      page: 1,
      pages: 1,
      tv_shows: [
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
      ],
    };
    let resultData: unknown;

    service
      .search(searchQuery)
      .subscribe((data: TvShowsPagedCollectionResponse) => (resultData = data));

    const request: TestRequest =
      httpTestingController.expectOne(expectedRequestUrl);
    expect(request.request.method).toEqual('GET');

    request.flush(expectedResponseData);
    httpTestingController.verify();

    expect(resultData).toEqual(expectedResponseData);
  });
});
