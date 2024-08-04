import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WishlistShowsComponent } from '@features/wishlist/components/wishlist-shows';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [WishlistShowsComponent],
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistPageComponent {}
