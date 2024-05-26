import { Episode } from '@core/models';

export class TvShowEpisodeFactory {
  public static createInstance(params?: Partial<Episode>): Episode {
    if (!params) {
      params = {};
    }

    const season = params?.season ?? 1;
    const episode = params?.episode ?? 1;

    return {
      season: season,
      episode: episode,
      name: `Episode #${episode} of season #${season}`,
      air_date: params.air_date ?? new Date().toISOString(),
    };
  }
}
