import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { WishlistShowsService } from '@features/wishlist/data-access/services';
import { TvShow } from '@core/models';
import { EmptyCollectionPlaceholderComponent } from '@shared/placeholders/empty-collection-placeholder';
import { TvShowCardComponent } from '@features/tv-shows/components/tv-show-card';
import { TranslationKey } from '@core/translations';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-wishlist-shows',
  standalone: true,
  imports: [
    EmptyCollectionPlaceholderComponent,
    TvShowCardComponent,
    TranslocoPipe,
  ],
  templateUrl: './wishlist-shows.component.html',
  styleUrl: './wishlist-shows.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistShowsComponent {
  private readonly wishlistService: WishlistShowsService =
    inject(WishlistShowsService);

  protected readonly EMPTY_MESSAGE: TranslationKey =
    'wishlistShows.emptyMessage';

  protected readonly shows: Signal<TvShow[]> = this.wishlistService.shows;
}
