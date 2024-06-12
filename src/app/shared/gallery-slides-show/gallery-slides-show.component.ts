import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  InputSignal,
  model,
  ModelSignal,
} from '@angular/core';
import { GalleryPhoto } from '@shared/gallery-slides-show/gallery-photo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery-slides-show',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery-slides-show.component.html',
  styleUrl: './gallery-slides-show.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GallerySlidesShowComponent {
  public photos: InputSignal<GalleryPhoto[]> = input.required<GalleryPhoto[]>();

  public activePhoto: ModelSignal<GalleryPhoto | null> =
    model<GalleryPhoto | null>(null);

  protected setActivePhoto(onePhoto: GalleryPhoto | null): void {
    this.activePhoto.set(onePhoto);
  }

  public constructor() {
    this.selectDefaultSlide();
  }

  private selectDefaultSlide(): void {
    effect(
      () => {
        const photos: GalleryPhoto[] = this.photos();
        const activePhoto: GalleryPhoto | null = this.activePhoto();

        if (!activePhoto || !photos.includes(activePhoto)) {
          this.setActivePhoto(photos[0] ?? null);
        }
      },
      { allowSignalWrites: true },
    );
  }
}
