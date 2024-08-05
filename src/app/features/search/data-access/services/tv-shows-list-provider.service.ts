import { inject, Injectable } from '@angular/core';
import { TvShow } from '@core/models';
import { filter, first, Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  TvShowsListActions,
  TvShowsListSelectors,
} from '@features/search/data-access/+state';

@Injectable({
  providedIn: 'root',
})
export class TvShowsListProviderService {
  private store: Store = inject(Store);

  public filterQuery = this.store.selectSignal(
    TvShowsListSelectors.selectCurrentQuery,
  );

  public currentPage = this.store.selectSignal(
    TvShowsListSelectors.selectCurrentPage,
  );

  public totalPages = this.store.selectSignal(
    TvShowsListSelectors.selectPagesCount,
  );

  public tvShows = this.store.selectSignal(
    TvShowsListSelectors.selectCurrentPageEntities,
  );

  public isLoading = this.store.selectSignal(
    TvShowsListSelectors.selectIsLoading,
  );

  private loadData(query: string | null, page: number): Observable<TvShow[]> {
    this.store.dispatch(
      TvShowsListActions.loadPage({
        query: query ?? undefined,
        page: page,
      }),
    );

    return this.store.select(TvShowsListSelectors.selectTvShowsListState).pipe(
      filter((state) => state.query === query && state.page === page),
      switchMap(() =>
        this.store.select(TvShowsListSelectors.selectCurrentPageEntities),
      ),
      first(),
    );
  }

  public search(q: string | null, page: number): void {
    this.loadData(q, page);
  }
}
