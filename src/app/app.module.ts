import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  provideRouter,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  withComponentInputBinding,
} from '@angular/router';
import { routes } from '@core/routing/app.routes';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '@core/+state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TranslocoRootModule } from '@core/translations';
import { TvShowEffects } from '@features/tv-shows/data-access/+state/tv-shows';
import { TvShowsListEffects } from '@features/search/data-access/+state';
import {
  TvShowsFavoritesEffects,
  TvShowsFavoritesPersistenceEffects,
} from '@features/favorites/data-access/+state';
import { TvShowsDetailsEffects } from '@features/tv-shows/data-access/+state/tv-shows-details';
import { TvShowsApiService } from '@core/api/tv-shows-api.service';
import { MockTvShowsApiService } from '@testing/api';
import { WishlistEffects } from '@features/wishlist/data-access/+state';
import { WishlistPersistenceEffects } from '@features/wishlist/data-access/+state/wishlist-persistence.effects';
import { UserEffects } from '@features/auth/data-access/+state';
import { UserPersistenceEffects } from '@features/auth/data-access/+state/user-persistence.effects';

@NgModule({
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot(
      UserEffects,
      UserPersistenceEffects,
      TvShowEffects,
      TvShowsListEffects,
      TvShowsFavoritesEffects,
      TvShowsFavoritesPersistenceEffects,
      TvShowsDetailsEffects,
      WishlistEffects,
      WishlistPersistenceEffects,
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    TranslocoRootModule,
  ],
  declarations: [AppComponent],
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    {
      provide: TvShowsApiService,
      useClass: MockTvShowsApiService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
