import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ResolvedTvShowDetails } from '@features/tv-shows-data-access/resolvers/types/resolved-tv-show-details';
import { map, Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { PathParams } from '@core/routing/path-params';
import { TvShowDetails, TvShowId } from '@core/models';
import { TvShowDetailsService } from '@features/tv-shows-data-access/services/tv-show-details.service';

const NOT_FOUND_MESSAGE = 'Tv show does not exist.';

export const tvShowDetailsResolver: ResolveFn<
  Observable<ResolvedTvShowDetails>
> = (route: ActivatedRouteSnapshot) => {
  const tvShowDetailsService: TvShowDetailsService =
    inject(TvShowDetailsService);

  const idParam: string | null = route.paramMap.get(PathParams.ID);
  const id: TvShowId | null = idParam ? +idParam : null;
  if (!id || isNaN(id)) {
    return of({
      details: null,
      isResolveError: true,
      resolveErrorMessage: NOT_FOUND_MESSAGE,
    });
  }

  return tvShowDetailsService.getDetails(id).pipe(
    map((details: TvShowDetails | null): ResolvedTvShowDetails => {
      return {
        details: details,
        isResolveError: !details,
        resolveErrorMessage: !details ? NOT_FOUND_MESSAGE : undefined,
      };
    }),
  );
};
