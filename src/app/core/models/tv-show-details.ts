import { Episode } from './episode';
import { TvShow } from './tv-show';

export interface TvShowDetails extends TvShow {
  url: string;
  description: string;
  description_source: string | null;
  runtime: number;
  youtube_link?: string | null;
  image_path: string;
  rating: string;
  rating_count: string;
  countdown?: number | null;
  genres: string[];
  pictures: string[];
  episodes: Episode[];
}
