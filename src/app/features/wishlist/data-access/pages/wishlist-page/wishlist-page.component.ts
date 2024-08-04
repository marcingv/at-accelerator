import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [],
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistPageComponent {}
