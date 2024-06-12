import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  InputSignal,
} from '@angular/core';
import { GalleryPhoto } from '@shared/gallery-slides-show';

@Component({
  selector: 'app-slide-thumb',
  standalone: true,
  imports: [],
  templateUrl: './slide-thumb.component.html',
  styleUrl: './slide-thumb.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideThumbComponent {
  private elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  public photo: InputSignal<GalleryPhoto> = input.required<GalleryPhoto>();

  public scrollIntoView(): void {
    this.elementRef.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }
}
