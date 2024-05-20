import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { TvShowsApiService } from "@core/api/tv-shows-api.service";
import { TvShow, TvShowsPagedCollectionResponse } from "@core/models";
import { catchError, finalize, map, Observable, of, switchMap } from "rxjs";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class TvShowsListProviderService {
  private filterQuerySignal: WritableSignal<string | null> = signal(null);
  private isLoadingSignal: WritableSignal<boolean> = signal<boolean>(false);

  private dataLoader$: Observable<TvShow[]> = toObservable(this.filterQuerySignal).pipe(
    switchMap((query: string | null) => this.loadData(query))
  )
  private tvShowsSignal: Signal<TvShow[]> = toSignal(this.dataLoader$, { initialValue: [] });

  public constructor(private api: TvShowsApiService) {
  }

  public showAll(): void {
    this.filterQuerySignal.set(null);
  }

  public filter(query: string): void {
    this.filterQuerySignal.set(query);
  }

  public get filterQuery(): Signal<string | null> {
    return this.filterQuerySignal.asReadonly();
  }

  public get tvShows(): Signal<TvShow[]> {
    return this.tvShowsSignal;
  }

  public get isLoading(): Signal<boolean> {
    return this.isLoadingSignal.asReadonly();
  }

  private loadData(query: string | null): Observable<TvShow[]> {
    const source$: Observable<TvShowsPagedCollectionResponse> = query && query.length ? this.api.search(query) : this.api.popularList();

    this.isLoadingSignal.set(true);

    return source$.pipe(
      map((response: TvShowsPagedCollectionResponse) => response.tv_shows),
      catchError(() => of([])),
      finalize(() => this.isLoadingSignal.set(false))
    );
  }
}
