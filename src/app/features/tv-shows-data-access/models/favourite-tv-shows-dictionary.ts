import { TvShow, TvShowId } from '@core/models';

export interface FavouriteTvShowsDictionary {
  [showId: TvShowId]: TvShow;
}
