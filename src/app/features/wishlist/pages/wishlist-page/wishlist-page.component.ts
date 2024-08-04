import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { WishlistShowsComponent } from '@features/wishlist/components/wishlist-shows';
import { WishlistShowsService } from '@features/wishlist/data-access/services';
import { TvShow } from '@core/models';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [WishlistShowsComponent],
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistPageComponent {
  private readonly wishlistService: WishlistShowsService =
    inject(WishlistShowsService);

  protected readonly shows: Signal<TvShow[]> = this.wishlistService.shows;
}
