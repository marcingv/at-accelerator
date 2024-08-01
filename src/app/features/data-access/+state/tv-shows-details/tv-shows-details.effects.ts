import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class TvShowsDetailsEffects {
  public constructor(private actions$: Actions) {}
}
