import {
  computed,
  Directive,
  HostBinding,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { TvShow } from '@core/models';
import { TvShowsFavouritesService } from '@features/data-access';
import { TranslationKey } from '@core/translations';
import { TranslocoService } from '@jsverse/transloco';

@Directive({
  selector: '[appToggleFavoriteTvShow]',
  standalone: true,
})
export class ToggleFavoriteTvShowDirective {
  private ADD_LABEL: TranslationKey = 'showsTable.actions.addToFavorites';
  private REMOVE_LABEL: TranslationKey =
    'showsTable.actions.removeFromFavorites';

  private readonly favoritesService = inject(TvShowsFavouritesService);
  private readonly transloco = inject(TranslocoService);

  public appToggleFavoriteTvShow = input.required<TvShow>();

  protected isFavorite = computed(() => {
    const tvShow: TvShow = this.appToggleFavoriteTvShow();
    if (!tvShow) {
      return false;
    }

    return this.favoritesService.isFavourite(tvShow.id)();
  });

  @HostListener('click', ['$event'])
  public toggleFavorite($event?: MouseEvent): void {
    $event?.preventDefault();

    const tvShow: TvShow = this.appToggleFavoriteTvShow();

    this.favoritesService.toggle(tvShow);
  }

  @HostBinding('class.highlight') get favoriteCssClass(): boolean {
    return this.isFavorite();
  }

  @HostBinding('attr.title') get title(): string {
    return this.isFavorite()
      ? this.transloco.translate(this.REMOVE_LABEL)
      : this.transloco.translate(this.ADD_LABEL);
  }
}
