import { Country } from "./country";
import { Status } from "./status";
import { DateString } from "./date-string";

export interface TvShow {
  id: number;
  name: string;
  permalink: string;
  start_date: DateString;
  end_date?: DateString | null;
  country: Country;
  network: string;
  status: Status;
  image_thumbnail_path: string;
}
