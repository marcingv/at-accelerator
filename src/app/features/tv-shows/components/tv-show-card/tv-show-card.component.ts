import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { isTvShowDetails, TvShow, TvShowDetails } from '@core/models';
import { CardComponent } from '@shared/cards';
import { BookmarkIconComponent } from '@shared/icons/bookmark-icon';
import { CommonModule } from '@angular/common';
import { InfoCircleIconComponent } from '@shared/icons/info-circle-icon';
import { ButtonDirective } from '@shared/buttons/directives';
import { Paths } from '@core/routing/paths';
import { RouterLink } from '@angular/router';
import { NextEpisodeCountdownPipe } from '@features/tv-shows/pipes';
import { ToggleFavoriteTvShowDirective } from '@features/tv-shows/directives';
import { ToggleWishlistDirective } from '@features/wishlist/directives';
import { ClipboardDocumentListIconComponent } from '@shared/icons/clipboard-document-list-icon';
import { TvShowCardActions } from './tv-show-card-actions';

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
    ToggleWishlistDirective,
    ClipboardDocumentListIconComponent,
  ],
  templateUrl: './tv-show-card.component.html',
  styleUrl: './tv-show-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvShowCardComponent {
  public readonly actions = input<TvShowCardActions[]>(['details']);
  public readonly toggleFavoriteAvailable = computed(() =>
    this.actions().includes('toggleFavorite'),
  );
  public readonly toggleWishlistAvailable = computed(() =>
    this.actions().includes('toggleWishlist'),
  );
  public readonly detailsAvailable = computed(() =>
    this.actions().includes('details'),
  );

  public readonly tvShow: InputSignal<TvShow | TvShowDetails> = input.required<
    TvShow | TvShowDetails
  >();

  public readonly tvShowDetails: Signal<TvShowDetails | undefined> = computed(
    () => {
      const tvShow = this.tvShow();

      return isTvShowDetails(tvShow) ? tvShow : undefined;
    },
  );

  protected cssBackgroundImage = computed(() => {
    return `url('${this.tvShow().image_thumbnail_path}')`;
  });

  protected detailsLink = computed(() => {
    return [Paths.ROOT, Paths.DETAILS, this.tvShow().id];
  });
}
