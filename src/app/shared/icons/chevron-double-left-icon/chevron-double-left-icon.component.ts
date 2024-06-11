import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseIconComponent } from '@shared/icons/base-icon.component';

@Component({
  selector: 'app-chevron-double-left-icon',
  standalone: true,
  imports: [],
  templateUrl: './chevron-double-left-icon.component.html',
  styleUrl: './chevron-double-left-icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChevronDoubleLeftIconComponent extends BaseIconComponent {
  protected override getUniqueCssClass(): string {
    return 'icon-chevron-double-left';
  }
}
