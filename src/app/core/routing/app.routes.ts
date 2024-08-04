import { Routes } from '@angular/router';
import { SearchPageComponent } from 'src/app/pages/search-page';
import { Paths } from './paths';
import { FavoritesPageComponent } from 'src/app/pages/favorites-page';
import { PathParams } from './path-params';
import { tvShowDetailsResolver } from '@features/data-access/resolvers';
import { MainLayoutComponent } from '@shared/layouts/main-layout';
import { favoritesLoadedGuard } from '@features/data-access/guards/favorites-loaded.guard';
import { WishlistPageComponent } from '@pages/wishlist-page';

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
        component: WishlistPageComponent,
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
