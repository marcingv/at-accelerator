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
  ],
  templateUrl: './tv-show-row-actions.component.html',
  styleUrl: './tv-show-row-actions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvShowRowActionsComponent implements OnChanges {
  @Input({ required: true }) public tvShow!: TvShow;

  protected detailsLink: string[] = [];

  public ngOnChanges(): void {
    this.detailsLink = [Paths.ROOT, Paths.DETAILS, this.tvShow.id + ''];
  }
}
