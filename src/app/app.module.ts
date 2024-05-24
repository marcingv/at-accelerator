import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, RouterLink, RouterOutlet } from '@angular/router';
import { routes } from '@core/routing/app.routes';

@NgModule({
  imports: [BrowserModule, RouterOutlet, RouterLink],
  declarations: [AppComponent],
  providers: [provideRouter(routes), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
