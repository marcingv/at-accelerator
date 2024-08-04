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
import { TvShowsListEffects } from '@features/tv-shows/data-access/+state/tv-shows-list';
import {
  TvShowsFavoritesEffects,
  TvShowsFavoritesPersistenceEffects,
} from '@features/tv-shows/data-access/+state/tv-shows-favorites';
import { TvShowsDetailsEffects } from '@features/tv-shows/data-access/+state/tv-shows-details';
import { TvShowsApiService } from '@core/api/tv-shows-api.service';
import { MockTvShowsApiService } from '@testing/api';

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
      TvShowEffects,
      TvShowsListEffects,
      TvShowsFavoritesEffects,
      TvShowsFavoritesPersistenceEffects,
      TvShowsDetailsEffects,
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
