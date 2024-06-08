import { Pipe, PipeTransform } from '@angular/core';
import { Episode, TvShowDetails } from '@core/models';

@Pipe({
  name: 'tvShowSeasonsCount',
  standalone: true,
})
export class TvShowSeasonsCountPipe implements PipeTransform {
  public transform(tvShow: TvShowDetails): number {
    const episodesBySeasons: { [season: number]: Episode[] } = (
      tvShow.episodes ?? []
    ).reduce(
      (
        prev: {
          [season: number]: Episode[];
        },
        oneEpisode: Episode,
      ) => {
        if (!prev[oneEpisode.season]) {
          prev[oneEpisode.season] = [];
        }

        prev[oneEpisode.season].push(oneEpisode);

        return prev;
      },
      {},
    );

    return Object.keys(episodesBySeasons).length;
  }
}
