import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpinnerIconComponent } from '@shared/icons/spinner-icon';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [SpinnerIconComponent],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSpinnerComponent {}
