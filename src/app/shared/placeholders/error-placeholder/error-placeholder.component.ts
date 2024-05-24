import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-placeholder',
  standalone: true,
  imports: [],
  templateUrl: './error-placeholder.component.html',
  styleUrl: './error-placeholder.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPlaceholderComponent {
  protected readonly DEFAULT_MESSAGE: string = 'An error occurred';

  @Input() public message?: string;
}
