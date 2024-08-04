import { inject, Injectable } from '@angular/core';
import { filter, first, Observable, of, shareReplay, switchMap } from 'rxjs';
import { TvShowDetails, TvShowId } from '@core/models';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import {
  fromTvShowsDetails,
  TvShowsDetailsActions,
} from '@features/tv-shows/data-access/+state/tv-shows-details';

@Injectable({
  providedIn: 'root',
})
export class TvShowDetailsService {
  private readonly store: Store = inject(Store);
  private readonly actions$: Actions = inject(Actions);

  public getDetails(id: TvShowId): Observable<TvShowDetails | null> {
    return this.store.select(fromTvShowsDetails.selectById(id)).pipe(
      switchMap((model: TvShowDetails | null) => {
        if (model) {
          return of(model);
        }

        return this.loadDetails(id);
      }),
    );
  }

  public getAll(): Observable<TvShowDetails[]> {
    return this.store.select(fromTvShowsDetails.selectAll);
  }

  public loadDetails(id: TvShowId): Observable<TvShowDetails | null> {
    const result$ = this.actions$.pipe(
      ofType(
        TvShowsDetailsActions.loadSuccess,
        TvShowsDetailsActions.loadFailure,
      ),
      filter((action) => action.id === id),
      first(),
      shareReplay(1),
    );

    result$.subscribe();
    this.store.dispatch(TvShowsDetailsActions.load({ id: id }));

    return result$.pipe(
      switchMap(() => this.store.select(fromTvShowsDetails.selectById(id))),
    );
  }
}
