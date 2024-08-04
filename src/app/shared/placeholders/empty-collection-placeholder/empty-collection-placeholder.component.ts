import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslationKey } from '@core/translations';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-empty-collection-placeholder',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './empty-collection-placeholder.component.html',
  styleUrl: './empty-collection-placeholder.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyCollectionPlaceholderComponent {
  protected readonly DEFAULT_MESSAGE: TranslationKey = 'common.emptyCollection';

  @Input() public message?: TranslationKey;
}
