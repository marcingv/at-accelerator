import { TvShowSeasonsCountPipe } from './tv-show-seasons-count.pipe';
import { TvShowDetails } from '@core/models';
import { TvShowDetailsFactory, TvShowEpisodeFactory } from '../../../testing';

describe('TvShowSeasonsCountPipe', (): void => {
  let pipe: TvShowSeasonsCountPipe;

  beforeEach((): void => {
    pipe = new TvShowSeasonsCountPipe();
  });

  it('create an instance', (): void => {
    expect(pipe).toBeTruthy();
  });

  it('should return seasons count', (): void => {
    const tvShow: TvShowDetails = TvShowDetailsFactory.createInstance({
      episodes: [
        TvShowEpisodeFactory.createInstance({ season: 1, episode: 1 }),
        TvShowEpisodeFactory.createInstance({ season: 1, episode: 2 }),
        TvShowEpisodeFactory.createInstance({ season: 2, episode: 1 }),
        TvShowEpisodeFactory.createInstance({ season: 2, episode: 2 }),
      ],
    });

    expect(pipe.transform(tvShow)).toEqual(2);
  });
});
