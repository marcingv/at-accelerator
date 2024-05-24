import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseIconComponent } from '../base-icon.component';

@Component({
  selector: 'app-arrow-top-right-on-square-icon',
  standalone: true,
  imports: [],
  templateUrl: './arrow-top-right-on-square-icon.component.html',
  styleUrl: './arrow-top-right-on-square-icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowTopRightOnSquareIconComponent extends BaseIconComponent {
  protected override getUniqueCssClass(): string {
    return 'icon-arrow-top-right-on-square';
  }
}
