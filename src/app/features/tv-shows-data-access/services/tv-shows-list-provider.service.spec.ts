import { TestBed } from '@angular/core/testing';
import { TvShowsListProviderService } from './tv-shows-list-provider.service';
import { TvShowsApiService } from '@core/api/tv-shows-api.service';
import createSpyObj = jasmine.createSpyObj;

describe('TvShowsListProviderService', () => {
  let service: TvShowsListProviderService;
  let api: jasmine.SpyObj<TvShowsApiService>;

  beforeEach(() => {
    api = createSpyObj<TvShowsApiService>(['popularList', 'search', 'details']);

    TestBed.configureTestingModule({
      providers: [{ provide: TvShowsApiService, useValue: api }],
    });
    service = TestBed.inject(TvShowsListProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
