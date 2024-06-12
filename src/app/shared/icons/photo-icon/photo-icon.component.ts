import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseIconComponent } from '@shared/icons/base-icon.component';

@Component({
  selector: 'app-photo-icon',
  standalone: true,
  imports: [],
  templateUrl: './photo-icon.component.html',
  styleUrl: './photo-icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoIconComponent extends BaseIconComponent {
  protected override getUniqueCssClass(): string {
    return 'icon-photo';
  }
}
