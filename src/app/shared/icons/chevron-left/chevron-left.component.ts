import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseIconComponent } from '@shared/icons/base-icon.component';

@Component({
  selector: 'app-chevron-left',
  standalone: true,
  imports: [],
  templateUrl: './chevron-left.component.html',
  styleUrl: './chevron-left.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChevronLeftComponent extends BaseIconComponent {
  protected override getUniqueCssClass(): string {
    return 'icon-chevron-left';
  }
}
