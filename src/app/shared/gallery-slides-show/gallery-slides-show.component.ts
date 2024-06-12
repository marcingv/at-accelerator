import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  InputSignal,
  model,
  ModelSignal,
  Signal,
  viewChildren,
} from '@angular/core';
import { GalleryPhoto } from '@shared/gallery-slides-show/gallery-photo';
import { CommonModule } from '@angular/common';
import { SlideThumbComponent } from '@shared/gallery-slides-show/slide-thumb/slide-thumb.component';

@Component({
  selector: 'app-gallery-slides-show',
  standalone: true,
  imports: [CommonModule, SlideThumbComponent],
  templateUrl: './gallery-slides-show.component.html',
  styleUrl: './gallery-slides-show.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GallerySlidesShowComponent {
  public photos: InputSignal<GalleryPhoto[]> = input.required<GalleryPhoto[]>();

  public activePhoto: ModelSignal<GalleryPhoto | null> =
    model<GalleryPhoto | null>(null);

  protected thumbs: Signal<readonly SlideThumbComponent[]> =
    viewChildren<SlideThumbComponent>(SlideThumbComponent);

  public constructor() {
    this.setUpAutoScroll();
    this.selectDefaultSlide();
  }

  protected setActivePhoto(onePhoto: GalleryPhoto | null): void {
    this.activePhoto.set(onePhoto);
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

  private setUpAutoScroll(): void {
    effect(() => {
      const thumbs: readonly SlideThumbComponent[] = this.thumbs();
      const activePhoto: GalleryPhoto | null = this.activePhoto();

      let thumbCmp: SlideThumbComponent | undefined;
      if (activePhoto && thumbs.length) {
        thumbCmp = thumbs.find((oneThumb) => oneThumb.photo() === activePhoto);
      }

      if (thumbCmp) {
        thumbCmp.scrollIntoView();
      }
    });
  }
}
