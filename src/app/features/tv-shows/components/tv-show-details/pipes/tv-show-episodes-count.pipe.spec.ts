import { TvShowEpisodesCountPipe } from './tv-show-episodes-count.pipe';
import { TvShowDetails } from '@core/models';
import { TvShowDetailsFactory, TvShowEpisodeFactory } from '@testing/factories';

describe('TvShowEpisodesCountPipe', (): void => {
  let pipe: TvShowEpisodesCountPipe;

  beforeEach((): void => {
    pipe = new TvShowEpisodesCountPipe();
  });

  it('create an instance', (): void => {
    expect(pipe).toBeTruthy();
  });

  it('should return episodes count', (): void => {
    const tvShow: TvShowDetails = TvShowDetailsFactory.createInstance({
      episodes: [
        TvShowEpisodeFactory.createInstance({ season: 1, episode: 1 }),
        TvShowEpisodeFactory.createInstance({ season: 1, episode: 2 }),
        TvShowEpisodeFactory.createInstance({ season: 2, episode: 1 }),
        TvShowEpisodeFactory.createInstance({ season: 2, episode: 2 }),
      ],
    });

    expect(pipe.transform(tvShow)).toEqual(4);
  });
});
