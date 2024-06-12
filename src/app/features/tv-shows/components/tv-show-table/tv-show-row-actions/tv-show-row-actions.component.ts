import {
  ChangeDetectionStrategy,
  Component,
  inject,
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
import { ToggleFavoriteTvShowDirective } from '@features/tv-shows/directives';
import { TvShowGalleryService } from '@features/tv-shows/components/tv-show-gallery-dialog';

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
  ],
  templateUrl: './tv-show-row-actions.component.html',
  styleUrl: './tv-show-row-actions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvShowRowActionsComponent implements OnChanges {
  protected readonly tvShowGalleryService = inject(TvShowGalleryService);

  @Input({ required: true }) public tvShow!: TvShow;

  protected detailsLink: string[] = [];

  public ngOnChanges(): void {
    this.detailsLink = [Paths.ROOT, Paths.DETAILS, this.tvShow.id + ''];
  }

  public showGalleryDialog(): void {
    this.tvShowGalleryService.showDialog(this.tvShow.id);
  }
}
