import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseIconComponent } from '@shared/icons/base-icon.component';

@Component({
  selector: 'app-close-icon',
  standalone: true,
  imports: [],
  templateUrl: './close-icon.component.html',
  styleUrl: './close-icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseIconComponent extends BaseIconComponent {
  protected override getUniqueCssClass(): string {
    return 'icon-close';
  }
}
