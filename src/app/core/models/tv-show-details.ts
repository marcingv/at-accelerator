import { Episode } from './episode';
import { TvShow } from './tv-show';

export function isTvShowDetails(obj: unknown): obj is TvShowDetails {
  return (
    !!obj && Object.hasOwn(obj, 'url') && Object.hasOwn(obj, 'description')
  );
}

export interface TvShowDetails extends TvShow {
  url: string;
  description: string;
  description_source: string | null;
  runtime: number;
  youtube_link?: string | null;
  image_path: string;
  rating: string;
  rating_count: string;
  countdown?: Episode | null;
  genres: string[];
  pictures: string[];
  episodes: Episode[];
}
