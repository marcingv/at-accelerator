import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseIconComponent } from '@shared/icons/base-icon.component';

@Component({
  selector: 'app-chevron-right',
  standalone: true,
  imports: [],
  templateUrl: './chevron-right.component.html',
  styleUrl: './chevron-right.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChevronRightComponent extends BaseIconComponent {
  protected override getUniqueCssClass(): string {
    return 'icon-chevron-right';
  }
}
