import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { TvShow, TvShowDetails } from '@core/models';
import { TranslationKey } from '@core/translations';
import { EmptyCollectionPlaceholderComponent } from '@shared/placeholders/empty-collection-placeholder';
import { TranslocoPipe } from '@jsverse/transloco';
import { TvShowCardComponent } from '@features/tv-shows/components/tv-show-card';

@Component({
  selector: 'app-tv-shows-list',
  standalone: true,
  imports: [
    EmptyCollectionPlaceholderComponent,
    TranslocoPipe,
    TvShowCardComponent,
  ],
  templateUrl: './tv-shows-list.component.html',
  styleUrl: './tv-shows-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvShowsListComponent {
  public readonly shows: InputSignal<Array<TvShow | TvShowDetails>> =
    input.required<Array<TvShow | TvShowDetails>>();

  public readonly emptyMessage: InputSignal<TranslationKey | undefined> =
    input<TranslationKey>();
}
