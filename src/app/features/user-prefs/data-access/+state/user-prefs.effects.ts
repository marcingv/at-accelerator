import { inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class UserPrefsEffects {
  actions$: Actions = inject(Actions);
}
