import { TvShowDetails } from '@core/models';

export interface ResolvedTvShowDetails {
  details: TvShowDetails | null;
  isResolveError: boolean;
  resolveErrorMessage?: string;
}
