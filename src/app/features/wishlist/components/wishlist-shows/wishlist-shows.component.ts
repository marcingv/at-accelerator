import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { TvShow } from '@core/models';
import { TranslationKey } from '@core/translations';
import { TvShowsListComponent } from '@features/tv-shows/components/tv-shows-list';

@Component({
  selector: 'app-wishlist-shows',
  standalone: true,
  imports: [TvShowsListComponent],
  templateUrl: './wishlist-shows.component.html',
  styleUrl: './wishlist-shows.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistShowsComponent {
  protected readonly EMPTY_MESSAGE: TranslationKey =
    'wishlistShows.emptyMessage';

  public readonly shows: InputSignal<TvShow[]> = input.required<TvShow[]>();
}
