import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  Signal,
} from '@angular/core';
import { TvShow } from '@core/models';
import { Paths } from '@core/routing/paths';
import { ButtonDirective } from '@shared/buttons/directives';
import { RouterLink } from '@angular/router';
import { TvShowsFavouritesService } from '@features/tv-shows-data-access';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tv-show-row-actions',
  standalone: true,
  imports: [CommonModule, ButtonDirective, RouterLink],
  templateUrl: './tv-show-row-actions.component.html',
  styleUrl: './tv-show-row-actions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvShowRowActionsComponent implements OnChanges {
  protected favouritesService = inject(TvShowsFavouritesService);
  protected isFavorite!: Signal<boolean>;

  @Input({ required: true }) public tvShow!: TvShow;

  protected detailsLink: string[] = [];

  public ngOnChanges(): void {
    this.isFavorite = this.favouritesService.isFavourite(this.tvShow.id);
    this.detailsLink = [Paths.ROOT, Paths.DETAILS, this.tvShow.id + ''];
  }

  protected addToFavourites($event?: MouseEvent): void {
    $event?.preventDefault();

    this.favouritesService.add(this.tvShow);
  }

  protected removeFromFavourites($event?: MouseEvent): void {
    $event?.preventDefault();

    this.favouritesService.remove(this.tvShow.id);
  }

  protected toggleFavorite($event?: MouseEvent): void {
    this.isFavorite()
      ? this.removeFromFavourites($event)
      : this.addToFavourites($event);
  }
}
