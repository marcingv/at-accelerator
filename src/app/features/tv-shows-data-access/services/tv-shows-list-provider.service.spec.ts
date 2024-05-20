import { TestBed } from '@angular/core/testing';
import { TvShowsListProviderService } from './tv-shows-list-provider.service';

describe('TvShowsListProviderService', () => {
  let service: TvShowsListProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvShowsListProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
