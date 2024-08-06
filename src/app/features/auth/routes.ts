import { Routes } from '@angular/router';
import { Paths } from '@core/routing/paths';
import { SignInPageComponent } from '@features/auth/pages/sign-in-page';

export const routes: Routes = [
  {
    path: Paths.SIGN_IN,
    component: SignInPageComponent,
  },
];
