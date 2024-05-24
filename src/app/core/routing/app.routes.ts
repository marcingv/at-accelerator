import { Routes } from '@angular/router';
import { SearchViewComponent } from '@pages/search-view';
import { Paths } from './paths';
import { FavoritesViewComponent } from '@pages/favorites-view';
import { PathParams } from './path-params';
import { DetailsViewComponent } from '@pages/details-view';
import { tvShowDetailsResolver } from '@features/tv-shows-data-access/resolvers';

export const routes: Routes = [
  { path: '', component: SearchViewComponent },
  { path: Paths.FAVORITES, component: FavoritesViewComponent },
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
        component: DetailsViewComponent,
        resolve: {
          data: tvShowDetailsResolver,
        },
      },
    ],
  },
  {
    path: Paths.WILDCARD,
    redirectTo: '',
  },
];
