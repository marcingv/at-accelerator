import { Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { fromWishlist, WishlistEffects } from './data-access/+state';
import { EffectsModule } from '@ngrx/effects';
import { WishlistPageComponent } from 'src/app/features/wishlist/data-access/pages/wishlist-page';

export const routes: Routes = [
  {
    path: '',
    component: WishlistPageComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(
          fromWishlist.wishlistFeatureKey,
          fromWishlist.reducer,
        ),
        EffectsModule.forFeature(WishlistEffects),
      ),
    ],
  },
];
