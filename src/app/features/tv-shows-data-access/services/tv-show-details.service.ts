import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { TvShowsDetailsDictionary } from '@features/tv-shows-data-access';
import { TvShowsApiService } from '@core/api/tv-shows-api.service';
import { TvShowDetails, TvShowDetailsResponse, TvShowId } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class TvShowDetailsService {
  private readonly api: TvShowsApiService = inject(TvShowsApiService);

  private readonly data$: BehaviorSubject<TvShowsDetailsDictionary> =
    new BehaviorSubject<TvShowsDetailsDictionary>({});

  public getDetails(id: TvShowId): Observable<TvShowDetails | null> {
    if (this.data$.value[id]) {
      return of(this.data$.value[id]);
    }

    // We have to load data from api
    return this.loadDetails(id);
  }

  public getAll(): Observable<TvShowDetails[]> {
    return this.data$.pipe(
      map((dict: TvShowsDetailsDictionary) => {
        return Object.values(dict);
      }),
    );
  }

  public loadDetails(id: TvShowId): Observable<TvShowDetails | null> {
    return this.api.details(id).pipe(
      catchError(() => of(null)),
      tap((response: TvShowDetailsResponse | null): void => {
        if (!response) {
          return;
        }

        const updatedDict: TvShowsDetailsDictionary = { ...this.data$.value };
        updatedDict[response.tvShow.id] = response.tvShow;

        this.data$.next(updatedDict);
      }),
      map(() => {
        return this.data$.value[id] ?? null;
      }),
    );
  }
}
