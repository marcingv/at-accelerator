import { TestBed } from '@angular/core/testing';
import { TvShowDetailsService } from './tv-show-details.service';
import SpyObj = jasmine.SpyObj;
import { TvShowsApiService } from '@core/api/tv-shows-api.service';
import createSpyObj = jasmine.createSpyObj;
import { TvShow, TvShowDetails } from '@core/models';
import { firstValueFrom, of } from 'rxjs';
import { TvShowDetailsFactory } from '../../../testing';

describe('TvShowDetailsService', () => {
  let service: TvShowDetailsService;
  let api: SpyObj<TvShowsApiService>;

  beforeEach(() => {
    api = createSpyObj<TvShowsApiService>(['details']);

    TestBed.configureTestingModule({
      providers: [{ provide: TvShowsApiService, useValue: api }],
    });

    service = TestBed.inject(TvShowDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially have details', async () => {
    const details: TvShowDetails[] = await firstValueFrom(service.getAll());

    expect(details.length).toEqual(0);
  });

  describe('Loading details from api', () => {
    it('should load details from api', async () => {
      api.details.and.callFake((id: TvShow['id']) => {
        return of({
          tvShow: TvShowDetailsFactory.createInstance({ id: id }),
        });
      });

      const details: TvShowDetails | null = await firstValueFrom(
        service.loadDetails(123),
      );

      expect(details).toBeTruthy();
      expect(api.details).toHaveBeenCalledOnceWith(123);

      const allDetails: TvShowDetails[] = await firstValueFrom(
        service.getAll(),
      );

      expect(allDetails.length).toEqual(1);
    });
  });

  describe('Getting details', () => {
    it('should cache details', async () => {
      api.details.and.callFake((id: TvShow['id']) => {
        return of({
          tvShow: TvShowDetailsFactory.createInstance({ id: id }),
        });
      });

      const details1: TvShowDetails | null = await firstValueFrom(
        service.getDetails(123),
      );

      const details2: TvShowDetails | null = await firstValueFrom(
        service.getDetails(123),
      );

      expect(details1).toBeTruthy();
      expect(details2).toBeTruthy();
      expect(details1).toBe(details2);
      expect(api.details).toHaveBeenCalledOnceWith(123);
    });
  });
});
