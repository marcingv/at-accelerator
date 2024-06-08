import { Pipe, PipeTransform } from '@angular/core';
import { TvShowDetails } from '@core/models';

@Pipe({
  name: 'tvShowEpisodesCount',
  standalone: true,
})
export class TvShowEpisodesCountPipe implements PipeTransform {
  public transform(tvShow: TvShowDetails): number {
    return (tvShow.episodes ?? []).length;
  }
}
