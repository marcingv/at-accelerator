import { Routes } from '@angular/router';
import { Paths } from './paths';
import { MainLayoutComponent } from '@shared/layouts/main-layout';
import * as TvShowsRoutes from '@features/tv-shows/routes';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      ...TvShowsRoutes.routes,
      {
        path: Paths.WISHLIST,
        loadChildren: () =>
          import('@features/wishlist/routes').then((m) => m.routes),
      },
      {
        path: Paths.WILDCARD,
        redirectTo: Paths.LIST,
      },
    ],
  },
];
