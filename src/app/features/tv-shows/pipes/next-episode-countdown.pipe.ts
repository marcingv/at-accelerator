import { Pipe, PipeTransform } from '@angular/core';
import { Episode, TvShowDetails } from '@core/models';

@Pipe({
  name: 'nextEpisodeCountdown',
  standalone: true,
})
export class NextEpisodeCountdownPipe implements PipeTransform {
  private readonly ONE_DAY_MILLIS: number = 1000 * 60 * 60 * 24;

  public transform(tvShow: TvShowDetails): string {
    if (tvShow.countdown) {
      return this.countdownText(tvShow.countdown);
    }

    if (tvShow.status === 'Canceled/Ended' || tvShow.status === 'Ended') {
      return 'Show has ended';
    }

    if (tvShow.status === 'Running') {
      return 'No next episode date';
    }

    return tvShow.status ?? 'No next episode date';
  }

  private countdownText(countdown: Episode): string {
    const now: number = Date.now();
    const airTime: number = new Date(countdown.air_date).getTime();
    const days: number = Math.floor((airTime - now) / this.ONE_DAY_MILLIS);

    if (days === 0) {
      return 'Next episode today';
    } else if (days === 1) {
      return 'Next episode tomorrow';
    } else {
      return `Next episode in ${days} days`;
    }
  }
}
