import {
  Directive,
  HostListener,
  inject,
  input,
  InputSignal,
} from '@angular/core';
import { TvShowGalleryService } from '../services/tv-show-gallery.service';
import { TvShowId } from '@core/models';

@Directive({
  selector: '[appOpenTvShowGallery]',
  standalone: true,
})
export class OpenTvShowGalleryDirective {
  protected readonly tvShowGalleryService = inject(TvShowGalleryService);

  public appOpenTvShowGallery: InputSignal<TvShowId> =
    input.required<TvShowId>();

  @HostListener('click', ['$events'])
  private onClick($event?: MouseEvent): void {
    $event?.preventDefault();

    const tvShowId: TvShowId = this.appOpenTvShowGallery();

    this.tvShowGalleryService.showDialog(tvShowId);
  }
}
