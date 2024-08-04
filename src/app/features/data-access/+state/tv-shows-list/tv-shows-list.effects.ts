import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concat, Observable, of, switchMap } from 'rxjs';
import { TvShowsListActions } from './tv-shows-list.actions';
import { TvShowsApiService } from '@core/api/tv-shows-api.service';
import { TvShowsPagedCollectionResponse } from '@core/models';
import { TvShowActions } from '@features/data-access/+state/tv-shows';

@Injectable()
export class TvShowsListEffects {
  loadPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TvShowsListActions.loadPage),
      switchMap((action) => {
        const source$: Observable<TvShowsPagedCollectionResponse> =
          action.query && action.query.length
            ? this.api.search(action.query, action.page)
            : this.api.popularList(action.page);

        return source$.pipe(
          switchMap((response) => {
            return concat(
              of(TvShowActions.addTvShows({ tvShows: response.tv_shows })),
              of(
                TvShowsListActions.loadPageSuccess({
                  query: action.query,
                  page: response.page,
                  pages: response.pages,
                  total: +response.total,
                  ids: response.tv_shows.map((oneTvShow) => oneTvShow.id),
                }),
              ),
            );
          }),
          catchError((error) =>
            of(
              TvShowsListActions.loadPageFailure({
                error: error,
              }),
            ),
          ),
        );
      }),
    );
  });

  public constructor(
    private actions$: Actions,
    private api: TvShowsApiService,
  ) {}
}
