import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ResolvedTvShowDetails } from '@features/tv-shows-data-access/resolvers/types/resolved-tv-show-details';
import { catchError, map, Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { TvShowsApiService } from '@core/api/tv-shows-api.service';
import { PathParams } from '@core/routing/path-params';
import { TvShow, TvShowDetailsResponse } from '@core/models';
import { HttpErrorResponse } from '@angular/common/http';

const NOT_FOUND_MESSAGE = 'Tv show does not exist.';
const FETCH_ERROR_MESSAGE = 'Could not fetch tv show details. Try again later.';

export const tvShowDetailsResolver: ResolveFn<
  Observable<ResolvedTvShowDetails>
> = (route: ActivatedRouteSnapshot) => {
  const api: TvShowsApiService = inject(TvShowsApiService);

  const idParam: string | null = route.paramMap.get(PathParams.ID);
  const id: TvShow['id'] | null = idParam ? +idParam : null;
  if (!id || isNaN(id)) {
    return of({
      details: null,
      isResolveError: true,
      resolveErrorMessage: NOT_FOUND_MESSAGE,
    });
  }

  return api.details(id).pipe(
    map((response: TvShowDetailsResponse): ResolvedTvShowDetails => {
      return {
        details: response.tvShow,
        isResolveError: false,
      };
    }),
    catchError((err: HttpErrorResponse): Observable<ResolvedTvShowDetails> => {
      return of({
        details: null,
        isResolveError: true,
        resolveErrorMessage:
          err.status === 404 ? NOT_FOUND_MESSAGE : FETCH_ERROR_MESSAGE,
      });
    }),
  );
};
