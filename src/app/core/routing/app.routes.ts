import { Routes } from '@angular/router';
import { SearchPageComponent } from 'src/app/pages/search-page';
import { Paths } from './paths';
import { FavoritesPageComponent } from 'src/app/pages/favorites-page';
import { PathParams } from './path-params';
import { tvShowDetailsResolver } from '@features/data-access/resolvers';
import { MainLayoutComponent } from '@shared/layouts/main-layout';
import { favoritesLoadedGuard } from '@features/data-access/guards/favorites-loaded.guard';
import { StoreModule } from '@ngrx/store';
import { fromWishlist } from '@features/wishlist/data-access/+state';
import { importProvidersFrom } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { WishlistEffects } from '@features/wishlist/data-access/+state/wishlist.effects';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: Paths.LIST, component: SearchPageComponent },
      {
        path: Paths.FAVORITES,
        component: FavoritesPageComponent,
        canActivate: [favoritesLoadedGuard],
      },
      {
        path: Paths.WISHLIST,
        loadComponent: () =>
          import('@pages/wishlist-page/wishlist-page.component').then(
            (m) => m.WishlistPageComponent,
          ),
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
      {
        path: Paths.DETAILS,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: '/',
          },
          {
            path: `:${PathParams.ID}`,
            loadComponent: () =>
              import('src/app/pages/details-page').then(
                (m) => m.DetailsPageComponent,
              ),
            resolve: {
              data: tvShowDetailsResolver,
            },
          },
        ],
      },
      {
        path: Paths.WILDCARD,
        redirectTo: Paths.LIST,
      },
    ],
  },
];
