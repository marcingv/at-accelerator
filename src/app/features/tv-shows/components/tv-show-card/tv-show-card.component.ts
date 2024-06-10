import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
} from '@angular/core';
import { TvShowDetails } from '@core/models';
import { CardComponent } from '@shared/cards';
import { TvShowsFavouritesService } from 'src/app/features/data-access';
import { BookmarkIconComponent } from '@shared/icons/bookmark-icon';
import { CommonModule } from '@angular/common';
import { InfoCircleIconComponent } from '@shared/icons/info-circle-icon';
import { ButtonDirective } from '@shared/buttons/directives';
import { Paths } from '@core/routing/paths';
import { RouterLink } from '@angular/router';
import { NextEpisodeCountdownPipe } from '@features/tv-shows/pipes';

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
  ],
  templateUrl: './tv-show-card.component.html',
  styleUrl: './tv-show-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvShowCardComponent {
  private readonly favoritesService = inject(TvShowsFavouritesService);

  public tvShow: InputSignal<TvShowDetails> = input.required<TvShowDetails>();

  protected isFavorite = computed(() => {
    return this.favoritesService.isFavourite(this.tvShow().id)();
  });

  protected cssBackgroundImage = computed(() => {
    return `url('${this.tvShow().image_thumbnail_path}')`;
  });

  protected detailsLink = computed(() => {
    return [Paths.ROOT, Paths.DETAILS, this.tvShow().id];
  });

  protected toggleFavorite(): void {
    this.favoritesService.toggle(this.tvShow());
  }
}
