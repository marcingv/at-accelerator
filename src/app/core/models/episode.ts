import { DateTimeString } from './date-time-string';

export interface Episode {
  season: number;
  episode: number;
  name: string;
  air_date: DateTimeString;
}
