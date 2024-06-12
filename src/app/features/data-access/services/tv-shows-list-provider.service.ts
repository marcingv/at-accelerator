import {
  effect,
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
  finalize,
  map,
  Observable,
  of,
  Subscription,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TvShowsListProviderService {
  public static readonly FIRST_PAGE: number = 1;

  private api: TvShowsApiService = inject(TvShowsApiService);

  private pageSignal: WritableSignal<number> = signal<number>(
    TvShowsListProviderService.FIRST_PAGE,
  );
  private filterQuerySignal: WritableSignal<string | null> = signal(null);
  private totalPageSignal: WritableSignal<number> = signal<number>(0);
  private isLoadingSignal: WritableSignal<boolean> = signal<boolean>(false);
  private tvShowsSignal: WritableSignal<TvShow[]> = signal<TvShow[]>([]);

  private currentLoadingTask?: Subscription;

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

  private loadData(query: string | null, page: number): Observable<TvShow[]> {
    const source$: Observable<TvShowsPagedCollectionResponse> =
      query && query.length
        ? this.api.search(query, page)
        : this.api.popularList(page);

    this.isLoadingSignal.set(true);

    return source$.pipe(
      catchError(() =>
        of({
          tv_shows: [],
          page: TvShowsListProviderService.FIRST_PAGE,
          pages: 1,
          total: '0',
        } satisfies TvShowsPagedCollectionResponse),
      ),
      tap((response: TvShowsPagedCollectionResponse): void => {
        this.tvShowsSignal.set(response.tv_shows);
        this.totalPageSignal.set(response.pages);
      }),
      map((response: TvShowsPagedCollectionResponse) => response.tv_shows),
      finalize(() => this.isLoadingSignal.set(false)),
    );
  }

  public constructor() {
    effect(
      (): void => {
        if (this.currentLoadingTask) {
          this.currentLoadingTask.unsubscribe();
          this.currentLoadingTask = undefined;
        }

        this.currentLoadingTask = this.loadData(
          this.filterQuery(),
          this.currentPage(),
        ).subscribe();
      },
      { allowSignalWrites: true },
    );
  }

  public search(q: string | null, page: number): void {
    this.filterQuerySignal.set(q);
    this.pageSignal.set(page);
  }
}
