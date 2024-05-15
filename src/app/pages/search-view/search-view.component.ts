import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowTableComponent } from "@features/tv-show-table";
import { TvShowsListProviderService } from "./services/tv-shows-list-provider.service";
import { TvShow } from "@core/models";
import { TvShowSearchFormComponent } from "@features/tv-show-search-form";

@Component({
  selector: 'app-search-view',
  standalone: true,
  imports: [CommonModule, TvShowTableComponent, TvShowSearchFormComponent],
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchViewComponent {
  public filterQuery: Signal<string | null> = this.listProvider.filterQuery;
  public tvShows: Signal<TvShow[]> = this.listProvider.tvShows;
  public isLoading: Signal<boolean> = this.listProvider.isLoading;

  public constructor(private listProvider: TvShowsListProviderService) {
  }

  public onSearch(query: string | null): void {
    if (query) {
      this.listProvider.filter(query);
    } else {
      this.listProvider.showAll();
    }
  }
}