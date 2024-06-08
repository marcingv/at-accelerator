import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { TvShowsFavouritesService } from 'src/app/features/data-access';
import { TvShowDetails, TvShowId } from '@core/models';
import { forkJoin, map, Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TvShowDetailsService } from '@features/data-access/services/tv-show-details.service';
import { TvShowCardComponent } from '@features/tv-shows/components/tv-show-card';
import { NextEpisodePipe } from '@features/tv-shows/pipes';

@Component({
  selector: 'app-favorite-tv-shows-list',
  standalone: true,
  imports: [CommonModule, TvShowCardComponent, NextEpisodePipe],
  templateUrl: './favorite-tv-shows-list.component.html',
  styleUrl: './favorite-tv-shows-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteTvShowsListComponent {
  private readonly favoritesService = inject(TvShowsFavouritesService);
  private readonly detailsService = inject(TvShowDetailsService);

  protected readonly favoritesId = this.favoritesService.idsSignal;

  public readonly favorites = signal<TvShowDetails[]>([]);

  public constructor() {
    effect(
      () => {
        this.loadDetailsFor(this.favoritesId()).subscribe();
      },
      { allowSignalWrites: true },
    );
  }

  private loadDetailsFor(ids: TvShowId[]): Observable<TvShowDetails[]> {
    const requests$: Array<Observable<TvShowDetails | null>> = [];

    ids.forEach((oneId: TvShowId) =>
      requests$.push(this.detailsService.getDetails(oneId)),
    );

    return forkJoin(requests$).pipe(
      map((data: Array<TvShowDetails | null>) => {
        return data.filter((details) => !!details) as TvShowDetails[];
      }),
      tap((data: Array<TvShowDetails>) => {
        this.favorites.set(data);
      }),
    );
  }
}
