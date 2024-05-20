import { TvShow } from "@core/models";

export interface FavouriteTvShowsDictionary {
  [showId: number]: TvShow;
}
