import { TvShowDetails, TvShowId } from '@core/models';

export interface TvShowsDetailsDictionary {
  [showId: TvShowId]: TvShowDetails;
}
