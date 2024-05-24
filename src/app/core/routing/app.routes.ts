import { Routes } from "@angular/router";
import { SearchViewComponent } from "@pages/search-view";
import { Paths } from "./paths";
import { FavoritesViewComponent } from "@pages/favorites-view";
import { PathParams } from "./path-params";
import { DetailsViewComponent } from "@pages/details-view";

export const routes: Routes = [
  { path: "", component: SearchViewComponent },
  { path: Paths.FAVORITES, component: FavoritesViewComponent },
  { path: `${ Paths.DETAILS }/:${ PathParams.ID }`, component: DetailsViewComponent },
];
