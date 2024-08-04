import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowTableComponent } from 'src/app/features/tv-shows/components/tv-show-table';
import { TvShowsListProviderService } from 'src/app/features/data-access';
import { TvShowSearchFormComponent } from 'src/app/features/tv-shows/components/tv-show-search-form';
import { PaginatorComponent } from '@shared/paginator';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { QueryParams } from '@core/routing/query-params';
import { Paths } from '@core/routing/paths';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface RouteQueryParams {
  q: string | null;
  page: number | null;
}

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    CommonModule,
    TvShowTableComponent,
    TvShowSearchFormComponent,
    PaginatorComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
  private readonly listProvider = inject(TvShowsListProviderService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly filterQuery = this.listProvider.filterQuery;
  protected readonly tvShows = this.listProvider.tvShows;
  protected readonly isLoading = this.listProvider.isLoading;
  protected readonly totalPages = this.listProvider.totalPages;
  protected readonly currentPage = this.listProvider.currentPage;

  protected queryParams$: Observable<RouteQueryParams> =
    this.activatedRoute.queryParamMap.pipe(
      map((params: ParamMap) => {
        const q: string | null = params.get(QueryParams.QUERY);
        const page: string | null = params.get(QueryParams.PAGE);

        const routeParams: RouteQueryParams = {
          q: q,
          page: page ? +page : null,
        };

        return routeParams;
      }),
    );

  public constructor() {
    this.updateQueryParamsOnSearch();
    this.applyQueryParamsSearch();
  }

  protected onSearch(query: string | null): void {
    this.listProvider.search(query, 1);
  }

  protected onPageChange(page: number): void {
    this.listProvider.search(this.filterQuery(), page);
  }

  private updateQueryParamsOnSearch(): void {
    effect(() => {
      const query = this.filterQuery();
      const page = this.currentPage();
      if (!page) {
        return;
      }

      const params: Params = {};
      if (page) {
        params[QueryParams.PAGE] = page;
      }
      if (query) {
        params[QueryParams.QUERY] = query;
      }

      this.router.navigate([Paths.ROOT, Paths.LIST], {
        queryParams: params,
      });
    });
  }

  private applyQueryParamsSearch(): void {
    this.queryParams$
      .pipe(
        tap((params: RouteQueryParams): void => {
          if (!params.q && !params.page) {
            this.listProvider.search(
              this.filterQuery(),
              this.currentPage() ?? 1,
            );

            return;
          }

          if (
            params.q !== this.filterQuery() ||
            params.page !== this.currentPage()
          ) {
            this.listProvider.search(params.q, params.page ?? 1);
          }
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
