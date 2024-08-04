import { fromTvShowsDetails } from '@features/data-access/+state/tv-shows-details';

export class TvShowsDetailsStateFactory {
  public static createInstance(
    params?: Partial<fromTvShowsDetails.State>,
  ): fromTvShowsDetails.State {
    if (!params) {
      params = {};
    }

    return {
      ids: params.ids ?? [],
      entities: params.entities ?? {},
    };
  }
}
