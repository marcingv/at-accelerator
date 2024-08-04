import {
  computed,
  Directive,
  HostBinding,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { WishlistShowsService } from '@features/wishlist/data-access/services';
import { TvShow } from '@core/models';
import { TranslationKey } from '@core/translations';
import { TranslocoService } from '@jsverse/transloco';

@Directive({
  selector: '[appToggleWishlist]',
  standalone: true,
})
export class ToggleWishlistDirective {
  private wishlistService: WishlistShowsService = inject(WishlistShowsService);
  private transloco: TranslocoService = inject(TranslocoService);

  protected ADD_LABEL: TranslationKey = 'showsTable.actions.addToWishlist';
  protected REMOVE_LABEL: TranslationKey =
    'showsTable.actions.removeFromWishlist';

  public appToggleWishlist = input.required<TvShow>();
  public isOnWishlist = computed(() =>
    this.wishlistService.isOnWishlist(this.appToggleWishlist().id)(),
  );

  @HostListener('click', ['$event'])
  public handleClick($event?: MouseEvent): void {
    $event?.preventDefault();

    this.wishlistService.toggle(this.appToggleWishlist().id);
  }

  @HostBinding('attr.title')
  public get title() {
    return this.isOnWishlist()
      ? this.transloco.translate(this.REMOVE_LABEL)
      : this.transloco.translate(this.ADD_LABEL);
  }

  @HostBinding('class.highlight') get cssHighlightClass(): boolean {
    return this.isOnWishlist();
  }
}
