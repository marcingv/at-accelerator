import { TvShow } from './tv-show';

export interface TvShowsPagedCollectionResponse {
  total: string;
  page: number;
  pages: number;
  tv_shows: TvShow[];
}
