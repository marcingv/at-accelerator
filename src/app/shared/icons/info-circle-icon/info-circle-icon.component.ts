import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseIconComponent } from '../base-icon.component';

@Component({
  selector: 'app-info-circle-icon',
  standalone: true,
  imports: [],
  templateUrl: './info-circle-icon.component.html',
  styleUrl: './info-circle-icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoCircleIconComponent extends BaseIconComponent {
  protected override getUniqueCssClass(): string {
    return 'icon-info-circle';
  }
}
