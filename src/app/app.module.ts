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
import { TvShowEffects } from '@features/data-access/+state/tv-shows';
import { TvShowsListEffects } from '@features/data-access/+state/tv-shows-list';
import {
  TvShowsFavoritesEffects,
  TvShowsFavoritesPersistenceEffects,
} from '@features/data-access/+state/tv-shows-favorites';
import { TvShowsDetailsEffects } from '@features/data-access/+state/tv-shows-details';

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
  ],
  declarations: [AppComponent],
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
