import {
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { TvShowsApiService } from '@core/api/tv-shows-api.service';
import { TvShow, TvShowsPagedCollectionResponse } from '@core/models';
import {
  catchError,
  combineLatestWith,
  debounceTime,
  finalize,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TvShowsListProviderService {
  private api: TvShowsApiService = inject(TvShowsApiService);

  private filterQuerySignal: WritableSignal<string | null> = signal(null);
  private pageSignal: WritableSignal<number> = signal<number>(1);
  private totalPageSignal: WritableSignal<number> = signal<number>(0);
  private isLoadingSignal: WritableSignal<boolean> = signal<boolean>(false);

  private page$: Observable<number> = toObservable(this.pageSignal);
  private query$: Observable<string | null> = toObservable(
    this.filterQuerySignal,
  );

  private dataLoader$: Observable<TvShow[]> = this.query$.pipe(
    combineLatestWith(this.page$),
    debounceTime(100),
    switchMap(([query, page]: [string | null, number]) =>
      this.loadData(query, page),
    ),
  );

  private tvShowsSignal: Signal<TvShow[]> = toSignal(this.dataLoader$, {
    initialValue: [],
  });

  public get filterQuery(): Signal<string | null> {
    return this.filterQuerySignal.asReadonly();
  }

  public get currentPage(): Signal<number> {
    return this.pageSignal.asReadonly();
  }

  public get totalPages(): Signal<number> {
    return this.totalPageSignal.asReadonly();
  }

  public get tvShows(): Signal<TvShow[]> {
    return this.tvShowsSignal;
  }

  public get isLoading(): Signal<boolean> {
    return this.isLoadingSignal.asReadonly();
  }

  public setPage(page: number): void {
    this.pageSignal.set(page);
  }

  public setQuery(query: string | null): void {
    this.pageSignal.set(1);
    this.filterQuerySignal.set(query);
  }

  private loadData(query: string | null, page: number): Observable<TvShow[]> {
    const source$: Observable<TvShowsPagedCollectionResponse> =
      query && query.length
        ? this.api.search(query, page)
        : this.api.popularList(page);

    this.isLoadingSignal.set(true);

    return source$.pipe(
      tap((response) => this.totalPageSignal.set(response.pages)),
      map((response: TvShowsPagedCollectionResponse) => response.tv_shows),
      catchError(() => of([])),
      finalize(() => this.isLoadingSignal.set(false)),
    );
  }
}
