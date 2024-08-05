import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationKey } from '@core/translations';
import { TvShowDetails } from '@core/models';
import { TvShowsListComponent } from '@features/tv-shows/components/tv-shows-list';

@Component({
  selector: 'app-favorite-tv-shows-list',
  standalone: true,
  imports: [CommonModule, TvShowsListComponent],
  templateUrl: './favorite-tv-shows-list.component.html',
  styleUrl: './favorite-tv-shows-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteTvShowsListComponent {
  protected readonly EMPTY_MESSAGE: TranslationKey =
    'favoritesShows.emptyMessage';

  public readonly favorites: InputSignal<TvShowDetails[]> =
    input.required<TvShowDetails[]>();
}
