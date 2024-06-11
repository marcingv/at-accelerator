import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowTableComponent } from 'src/app/features/tv-shows/components/tv-show-table';
import { TvShowsListProviderService } from 'src/app/features/data-access';
import { TvShow } from '@core/models';
import { TvShowSearchFormComponent } from 'src/app/features/tv-shows/components/tv-show-search-form';
import { PaginatorComponent } from '@shared/paginator';

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

  protected readonly filterQuery = this.listProvider.filterQuery;
  protected readonly tvShows: Signal<TvShow[]> = this.listProvider.tvShows;
  protected readonly isLoading: Signal<boolean> = this.listProvider.isLoading;

  protected readonly totalPages = this.listProvider.totalPages;
  protected readonly currentPage = signal<number>(
    this.listProvider.currentPage(),
  );

  protected onSearch(query: string | null): void {
    this.listProvider.setQuery(query);
    this.currentPage.set(1);
  }

  protected onPageChange(): void {
    this.listProvider.setPage(this.currentPage());
  }
}
