import { TvShow } from "@core/models";

export interface FavouriteTvShowsDictionary {
    [showId: TvShow['id']]: TvShow;
}
