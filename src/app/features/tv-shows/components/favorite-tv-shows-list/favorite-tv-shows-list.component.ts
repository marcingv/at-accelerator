import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowCardComponent } from '@features/tv-shows/components/tv-show-card';
import { EmptyCollectionPlaceholderComponent } from '@shared/placeholders/empty-collection-placeholder';
import { TvShowsFavouritesService } from '@features/data-access';

@Component({
  selector: 'app-favorite-tv-shows-list',
  standalone: true,
  imports: [
    CommonModule,
    TvShowCardComponent,
    EmptyCollectionPlaceholderComponent,
  ],
  templateUrl: './favorite-tv-shows-list.component.html',
  styleUrl: './favorite-tv-shows-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteTvShowsListComponent {
  private readonly favoritesService = inject(TvShowsFavouritesService);

  public readonly favorites = this.favoritesService.favorites;
}
