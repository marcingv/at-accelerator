import { NextEpisodePipe } from './next-episode.pipe';
import { TvShowDetailsFactory, TvShowEpisodeFactory } from '@testing/factories';
import { Episode } from '@core/models';

describe('NextEpisodePipe', () => {
  const ONE_DAY_MILLIS: number = 1000 * 60 * 60 * 24;
  let pipe: NextEpisodePipe;

  beforeEach(() => {
    pipe = new NextEpisodePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return next episode', () => {
    const now = Date.now();
    const tvShow = TvShowDetailsFactory.createInstance({
      episodes: [
        TvShowEpisodeFactory.createInstance({
          air_date: new Date(now - 2 * ONE_DAY_MILLIS).toUTCString(),
        }),
        TvShowEpisodeFactory.createInstance({
          air_date: new Date(now - ONE_DAY_MILLIS).toUTCString(),
        }),
        TvShowEpisodeFactory.createInstance({
          air_date: new Date(now + ONE_DAY_MILLIS).toUTCString(),
        }),
        TvShowEpisodeFactory.createInstance({
          air_date: new Date(now + 2 * ONE_DAY_MILLIS).toUTCString(),
        }),
      ],
    });

    const nextEpisode: Episode | null = pipe.transform(tvShow);

    expect(nextEpisode).toBeTruthy();
    expect(nextEpisode).toEqual(tvShow.episodes[2]);
  });
});
