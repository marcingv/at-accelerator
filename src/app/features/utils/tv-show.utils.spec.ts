import { Episode, TvShowDetails } from '@core/models';
import { TvShowDetailsFactory, TvShowEpisodeFactory } from '../../testing';
import { getNextEpisode, sortEpisodes } from '@features/utils/tv-show.utils';

describe('TvShowUtils', () => {
  it('Sorting episodes', () => {
    const unsortedEpisodes: Episode[] = [
      TvShowEpisodeFactory.createInstance({
        episode: 1,
        air_date: '2024-01-01',
      }),
      TvShowEpisodeFactory.createInstance({
        episode: 1,
        air_date: '2024-01-04',
      }),
      TvShowEpisodeFactory.createInstance({
        episode: 1,
        air_date: '2024-01-05',
      }),
      TvShowEpisodeFactory.createInstance({
        episode: 1,
        air_date: '2024-01-02',
      }),
      TvShowEpisodeFactory.createInstance({
        episode: 1,
        air_date: '2024-01-03',
      }),
    ];

    const sortedEpisodes: Episode[] = sortEpisodes(unsortedEpisodes);

    expect(sortedEpisodes).not.toBe(unsortedEpisodes);
    expect(sortedEpisodes.length).toEqual(unsortedEpisodes.length);

    sortedEpisodes.forEach((oneEpisode: Episode, index: number) => {
      if (index === unsortedEpisodes.length - 1) {
        return;
      }

      const nextEpisode: Episode = sortedEpisodes[index + 1];

      const prevEpisodeTime: number = new Date(oneEpisode.air_date).getTime();
      const nextEpisodeTime: number = new Date(nextEpisode.air_date).getTime();

      expect(prevEpisodeTime)
        .withContext(
          `${oneEpisode.air_date} should be before ${nextEpisode.air_date}`,
        )
        .toBeLessThanOrEqual(nextEpisodeTime);
    });
  });

  it('should return next episode to be on air', () => {
    const tvShow: TvShowDetails = TvShowDetailsFactory.createInstance({
      episodes: [
        TvShowEpisodeFactory.createInstance({
          air_date: '2024-01-01 20:00:00',
        }),
        TvShowEpisodeFactory.createInstance({
          air_date: '2024-01-02 20:00:00',
        }),
        TvShowEpisodeFactory.createInstance({
          air_date: '2024-01-03 20:00:00',
        }),
        TvShowEpisodeFactory.createInstance({
          air_date: '2024-01-04 20:00:00',
        }),
        TvShowEpisodeFactory.createInstance({
          air_date: '2024-01-05 20:00:00',
        }),
      ],
    });

    const relativeToDate = new Date('2024-01-02 21:00:00');
    const nextEpisode: Episode | null = getNextEpisode(tvShow, relativeToDate);

    expect(nextEpisode).toBeTruthy();
    expect(nextEpisode).toBe(tvShow.episodes[2]);
  });
});
