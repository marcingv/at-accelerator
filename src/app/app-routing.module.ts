import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchViewComponent } from '@pages/search-view';
import { FavoritesViewComponent } from "@pages/favorites-view";

const routes: Routes = [
  { path: "", component: SearchViewComponent },
  { path: "favorites", component: FavoritesViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
