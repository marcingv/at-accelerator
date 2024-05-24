import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShow } from '@core/models';
import { LoadingSpinnerComponent } from '@shared/loading-spinner';
import { TvShowsFavouritesService } from '@features/tv-shows-data-access';

@Component({
  selector: 'app-tv-show-table',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './tv-show-table.component.html',
  styleUrls: ['./tv-show-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvShowTableComponent {
  protected favouritesService = inject(TvShowsFavouritesService);

  @Input({ required: true }) shows: TvShow[] = [];
  @Input() isLoading: boolean = false;

  protected addToFavourites(tvShow: TvShow, $event?: MouseEvent): void {
    $event?.preventDefault();

    this.favouritesService.add(tvShow);
  }

  protected removeFromFavourites(tvShow: TvShow, $event?: MouseEvent): void {
    $event?.preventDefault();

    this.favouritesService.remove(tvShow.id);
  }
}
