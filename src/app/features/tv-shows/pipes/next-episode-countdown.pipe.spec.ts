import { NextEpisodeCountdownPipe } from './next-episode-countdown.pipe';
import { TvShowDetailsFactory, TvShowEpisodeFactory } from '../../../testing';
import { Status } from '@core/models';

describe('NextEpisodeCountdownPipe', (): void => {
  let pipe: NextEpisodeCountdownPipe;

  const ONE_DAY_MILLIS: number = 1000 * 60 * 60 * 24;
  const ONE_MINUTE_MILLIS: number = 1000 * 60;

  beforeEach((): void => {
    pipe = new NextEpisodeCountdownPipe();
  });

  it('create an instance', (): void => {
    expect(pipe).toBeTruthy();
  });

  describe('Next episode countdown data is available', () => {
    it('should print next episode is today', () => {
      const tvShow = TvShowDetailsFactory.createInstance({
        countdown: TvShowEpisodeFactory.createInstance({
          air_date: new Date(Date.now() + ONE_MINUTE_MILLIS).toUTCString(),
        }),
      });

      expect(pipe.transform(tvShow)).toEqual('Next episode today');
    });

    it('should print next episode is tomorrow', () => {
      const tvShow = TvShowDetailsFactory.createInstance({
        countdown: TvShowEpisodeFactory.createInstance({
          air_date: new Date(
            Date.now() + ONE_DAY_MILLIS + ONE_MINUTE_MILLIS,
          ).toUTCString(),
        }),
      });

      expect(pipe.transform(tvShow)).toEqual('Next episode tomorrow');
    });

    it('should print next episode in X days', () => {
      const tvShow = TvShowDetailsFactory.createInstance({
        countdown: TvShowEpisodeFactory.createInstance({
          air_date: new Date(
            Date.now() + 5 * ONE_DAY_MILLIS + ONE_MINUTE_MILLIS,
          ).toUTCString(),
        }),
      });

      expect(pipe.transform(tvShow)).toEqual('Next episode in 5 days');
    });
  });

  describe('Show has ended', () => {
    const statuses: Status[] = ['Canceled/Ended', 'Ended'];

    statuses.forEach((oneEndedStatus: Status) => {
      it(`should display show has ended for status: "${oneEndedStatus}"`, () => {
        const tvShow = TvShowDetailsFactory.createInstance({
          status: oneEndedStatus,
        });

        expect(pipe.transform(tvShow)).toEqual('Show has ended');
      });
    });
  });

  describe('Show is running but there is no next episode data', () => {
    it('should display "no next episode date" info', () => {
      const tvShow = TvShowDetailsFactory.createInstance({
        status: 'Running',
        countdown: undefined,
      });

      expect(pipe.transform(tvShow)).toEqual('No next episode date');
    });
  });

  it('should display "status" when all conditions do not match', () => {
    const tvShow = TvShowDetailsFactory.createInstance({
      status: 'To Be Determined',
      countdown: undefined,
    });

    expect(pipe.transform(tvShow)).toEqual('To Be Determined');
  });
});
