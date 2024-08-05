import {
  Directive,
  HostBinding,
  HostListener,
  inject,
  input,
  InputSignal,
} from '@angular/core';
import { TvShowGalleryService } from '@features/tv-shows/components/tv-show-gallery-dialog';
import { TvShowId } from '@core/models';
import { TranslocoService } from '@jsverse/transloco';
import { TranslationKey } from '@core/translations';

@Directive({
  selector: '[appOpenTvShowGallery]',
  standalone: true,
})
export class OpenTvShowGalleryDirective {
  protected readonly tvShowGalleryService = inject(TvShowGalleryService);
  protected readonly transloco = inject(TranslocoService);

  private readonly OPEN_LABEL: TranslationKey =
    'showsTable.actions.openGallery';

  public appOpenTvShowGallery: InputSignal<TvShowId> =
    input.required<TvShowId>();

  @HostListener('click', ['$events'])
  private onClick($event?: MouseEvent): void {
    $event?.preventDefault();

    const tvShowId: TvShowId = this.appOpenTvShowGallery();

    this.tvShowGalleryService.showDialog(tvShowId);
  }

  @HostBinding('attr.title')
  private get title(): string {
    return this.transloco.translate(this.OPEN_LABEL);
  }
}
