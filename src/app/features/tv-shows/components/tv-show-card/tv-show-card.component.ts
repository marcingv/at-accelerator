import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
} from '@angular/core';
import { TvShowDetails } from '@core/models';
import { CardComponent } from '@shared/cards';
import { BookmarkIconComponent } from '@shared/icons/bookmark-icon';
import { CommonModule } from '@angular/common';
import { InfoCircleIconComponent } from '@shared/icons/info-circle-icon';
import { ButtonDirective } from '@shared/buttons/directives';
import { Paths } from '@core/routing/paths';
import { RouterLink } from '@angular/router';
import { NextEpisodeCountdownPipe } from '@features/tv-shows/pipes';
import { ToggleFavoriteTvShowDirective } from '@features/tv-shows/directives';

@Component({
  selector: 'app-tv-show-card',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    BookmarkIconComponent,
    InfoCircleIconComponent,
    ButtonDirective,
    RouterLink,
    NextEpisodeCountdownPipe,
    ToggleFavoriteTvShowDirective,
  ],
  templateUrl: './tv-show-card.component.html',
  styleUrl: './tv-show-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvShowCardComponent {
  public tvShow: InputSignal<TvShowDetails> = input.required<TvShowDetails>();

  protected cssBackgroundImage = computed(() => {
    return `url('${this.tvShow().image_thumbnail_path}')`;
  });

  protected detailsLink = computed(() => {
    return [Paths.ROOT, Paths.DETAILS, this.tvShow().id];
  });
}
