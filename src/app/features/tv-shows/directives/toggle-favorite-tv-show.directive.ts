import { Directive, HostListener, inject, input } from '@angular/core';
import { TvShow } from '@core/models';
import { TvShowsFavouritesService } from '@features/data-access';

@Directive({
  selector: '[appToggleFavoriteTvShow]',
  standalone: true,
})
export class ToggleFavoriteTvShowDirective {
  private readonly favoritesService = inject(TvShowsFavouritesService);

  public appToggleFavoriteTvShow = input.required<TvShow>();

  @HostListener('click', ['$event'])
  public toggleFavorite($event?: MouseEvent): void {
    $event?.preventDefault();

    const tvShow: TvShow = this.appToggleFavoriteTvShow();

    this.favoritesService.toggle(tvShow);
  }
}
