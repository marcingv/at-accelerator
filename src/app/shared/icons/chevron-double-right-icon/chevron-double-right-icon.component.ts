import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseIconComponent } from '@shared/icons/base-icon.component';

@Component({
  selector: 'app-chevron-double-right-icon',
  standalone: true,
  imports: [],
  templateUrl: './chevron-double-right-icon.component.html',
  styleUrl: './chevron-double-right-icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChevronDoubleRightIconComponent extends BaseIconComponent {
  protected override getUniqueCssClass(): string {
    return 'icon-chevron-double-right';
  }
}
