import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
  ViewChild,
} from '@angular/core';
import { TvShowDetails } from '@core/models';
import { DialogComponent } from '@shared/dialogs';
import {
  GalleryPhoto,
  GallerySlidesShowComponent,
} from '@shared/gallery-slides-show';

@Component({
  selector: 'app-tv-show-gallery-dialog',
  standalone: true,
  imports: [DialogComponent, GallerySlidesShowComponent],
  templateUrl: './tv-show-gallery-dialog.component.html',
  styleUrl: './tv-show-gallery-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvShowGalleryDialogComponent {
  public tvShow: InputSignal<TvShowDetails> = input.required<TvShowDetails>();
  public closed: OutputEmitterRef<void> = output<void>();

  public gallerySlides: Signal<GalleryPhoto[]> = computed(() => {
    const details: TvShowDetails | null = this.tvShow();
    if (!details) {
      return [];
    }

    const photos: GalleryPhoto[] = [{ url: details.image_path }];

    details.pictures.forEach((onePictureUrl: string) =>
      photos.push({
        url: onePictureUrl,
      }),
    );

    return photos;
  });

  @ViewChild(DialogComponent, { static: true }) public dialog!: DialogComponent;
}
