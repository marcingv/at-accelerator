import { Country } from './country';
import { Status } from './status';
import { DateString } from './date-string';
import { TvShowId } from './tv-show-id';

export interface TvShow {
  id: TvShowId;
  name: string;
  permalink: string;
  start_date: DateString;
  end_date?: DateString | null;
  country: Country;
  network: string;
  status?: Status;
  image_thumbnail_path: string;
}
