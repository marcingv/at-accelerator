import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { TvShow } from '@core/models';
import { Paths } from '@core/routing/paths';
import { ButtonDirective } from '@shared/buttons/directives';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookmarkIconComponent } from '@shared/icons/bookmark-icon';
import { InfoCircleIconComponent } from '@shared/icons/info-circle-icon';
import { ArrowTopRightOnSquareIconComponent } from '@shared/icons/arrow-top-right-on-square-icon';
import {
  OpenTvShowGalleryDirective,
  ToggleFavoriteTvShowDirective,
} from '@features/tv-shows/directives';
import { ClipboardDocumentListIconComponent } from '@shared/icons/clipboard-document-list-icon';
import { TranslationKey } from '@core/translations';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-tv-show-row-actions',
  standalone: true,
  imports: [
    CommonModule,
    ButtonDirective,
    RouterLink,
    BookmarkIconComponent,
    InfoCircleIconComponent,
    ArrowTopRightOnSquareIconComponent,
    ToggleFavoriteTvShowDirective,
    OpenTvShowGalleryDirective,
    ClipboardDocumentListIconComponent,
    TranslocoPipe,
  ],
  templateUrl: './tv-show-row-actions.component.html',
  styleUrl: './tv-show-row-actions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvShowRowActionsComponent implements OnChanges {
  protected readonly DETAILS_LABEL: TranslationKey =
    'showsTable.actions.details';
  protected readonly WISHLIST_ADD: TranslationKey =
    'showsTable.actions.addToWishlist';
  protected readonly WISHLIST_REMOVE: TranslationKey =
    'showsTable.actions.removeFromWishlist';

  @Input({ required: true }) public tvShow!: TvShow;

  protected detailsLink: string[] = [];

  public ngOnChanges(): void {
    this.detailsLink = [Paths.ROOT, Paths.DETAILS, this.tvShow.id + ''];
  }
}
