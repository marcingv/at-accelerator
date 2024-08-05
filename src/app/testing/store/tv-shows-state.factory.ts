import { fromTvShows } from '@features/tv-shows/data-access/+state/tv-shows';

export class TvShowsStateFactory {
  public static createInstance(
    params?: Partial<fromTvShows.State>,
  ): fromTvShows.State {
    if (!params) {
      params = {};
    }

    return {
      ids: params?.ids ?? [],
      entities: params?.entities ?? {},
    };
  }
}
