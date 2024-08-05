import { Routes } from '@angular/router';
import { WishlistPageComponent } from '@features/wishlist/pages/wishlist-page';
import { wishlistLoadedGuard } from '@features/wishlist/data-access/guards';

export const routes: Routes = [
  {
    path: '',
    component: WishlistPageComponent,
    canActivate: [wishlistLoadedGuard],
  },
];
