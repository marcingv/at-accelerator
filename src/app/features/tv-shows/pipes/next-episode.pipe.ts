import { Pipe, PipeTransform } from '@angular/core';
import { Episode, TvShowDetails } from '@core/models';
import { getNextEpisode } from '@features/tv-shows/utils';

@Pipe({
  name: 'nextEpisode',
  standalone: true,
})
export class NextEpisodePipe implements PipeTransform {
  public transform(tvShow: TvShowDetails): Episode | null {
    return getNextEpisode(tvShow);
  }
}
