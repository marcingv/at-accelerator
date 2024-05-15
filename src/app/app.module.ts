import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoritesViewComponent } from './favorites-view/favorites-view.component';
import { provideHttpClient, withFetch } from "@angular/common/http";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    FavoritesViewComponent
  ],
  providers: [
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
