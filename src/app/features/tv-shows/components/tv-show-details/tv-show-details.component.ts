import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TvShowDetails } from '@core/models';
import { DatePipe, DecimalPipe, I18nPluralPipe } from '@angular/common';
import { TvShowEpisodesCountPipe } from '@features/tv-shows/components/tv-show-details/pipes/tv-show-episodes-count.pipe';
import { EpisodePluralForms } from '@features/tv-shows/components/tv-show-details/pipes/episode-plural-forms';
import { TvShowSeasonsCountPipe } from '@features/tv-shows/components/tv-show-details/pipes/tv-show-seasons-count.pipe';
import { SeasonPluralForms } from '@features/tv-shows/components/tv-show-details/pipes/season-plural-forms';

@Component({
  selector: 'app-tv-show-details',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    TvShowEpisodesCountPipe,
    I18nPluralPipe,
    TvShowSeasonsCountPipe,
  ],
  templateUrl: './tv-show-details.component.html',
  styleUrl: './tv-show-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvShowDetailsComponent {
  protected readonly EpisodesPluralForms = EpisodePluralForms;
  protected readonly SeasonPluralForms = SeasonPluralForms;

  @Input({ required: true }) public details!: TvShowDetails;
}
