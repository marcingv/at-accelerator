import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseIconComponent } from '@shared/icons/base-icon.component';

@Component({
  selector: 'app-spinner-icon',
  standalone: true,
  imports: [],
  templateUrl: './spinner-icon.component.html',
  styleUrl: './spinner-icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerIconComponent extends BaseIconComponent {
  protected override getUniqueCssClass(): string {
    return 'icon-spinner';
  }
}
