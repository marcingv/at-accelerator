import { TvShowDetails } from '@core/models';

export interface TvShowsDetailsDictionary {
  [showId: TvShowDetails['id']]: TvShowDetails;
}
