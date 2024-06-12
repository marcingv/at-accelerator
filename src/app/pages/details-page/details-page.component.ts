import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { ResolvedTvShowDetails } from '@features/data-access/resolvers';
import { ErrorPlaceholderComponent } from '@shared/placeholders/error-placeholder';
import { TvShowDetailsComponent } from 'src/app/features/tv-shows/components/tv-show-details';
import { BackButtonComponent } from '@shared/buttons/components/back-button';
import { ButtonDirective } from '@shared/buttons/directives';
import { PhotoIconComponent } from '@shared/icons/photo-icon';
import { DialogComponent, ToggleDialogDirective } from '@shared/dialogs';
import {
  GalleryPhoto,
  GallerySlidesShowComponent,
} from '@shared/gallery-slides-show';
import { TvShowDetails } from '@core/models';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [
    ErrorPlaceholderComponent,
    TvShowDetailsComponent,
    BackButtonComponent,
    ButtonDirective,
    PhotoIconComponent,
    DialogComponent,
    ToggleDialogDirective,
    GallerySlidesShowComponent,
  ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsPageComponent {
  public data: InputSignal<ResolvedTvShowDetails> =
    input.required<ResolvedTvShowDetails>();

  public details: Signal<TvShowDetails | null> = computed(() => {
    return this.data().details;
  });

  public gallerySlides: Signal<GalleryPhoto[]> = computed(() => {
    const details: TvShowDetails | null = this.details();
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
}
