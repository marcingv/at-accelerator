import { Routes } from '@angular/router';
import { Paths } from '@core/routing/paths';
import { SearchPageComponent } from '@features/tv-shows/pages/search-page';
import { FavoritesPageComponent } from '@features/tv-shows/pages/favorites-page';
import { PathParams } from '@core/routing/path-params';
import { favoritesLoadedGuard } from '@features/tv-shows/data-access/guards/favorites-loaded.guard';
import { tvShowDetailsResolver } from '@features/tv-shows/data-access/resolvers';

export const routes: Routes = [
  { path: Paths.LIST, component: SearchPageComponent },
  {
    path: Paths.FAVORITES,
    component: FavoritesPageComponent,
    canActivate: [favoritesLoadedGuard],
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
          import('src/app/features/tv-shows/pages/details-page').then(
            (m) => m.DetailsPageComponent,
          ),
        resolve: {
          data: tvShowDetailsResolver,
        },
      },
    ],
  },
];
