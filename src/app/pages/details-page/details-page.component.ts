import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { ResolvedTvShowDetails } from '@features/data-access/resolvers';
import { ErrorPlaceholderComponent } from '@shared/placeholders/error-placeholder';
import { TvShowDetailsComponent } from 'src/app/features/tv-shows/components/tv-show-details';
import { BackButtonComponent } from '@shared/buttons/components/back-button';
import { ButtonDirective } from '@shared/buttons/directives';
import { PhotoIconComponent } from '@shared/icons/photo-icon';
import { ToggleDialogDirective } from '@shared/dialogs';
import { TvShowDetails } from '@core/models';
import { TvShowGalleryDialogComponent } from '@features/tv-shows/components/tv-show-gallery-dialog';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [
    ErrorPlaceholderComponent,
    TvShowDetailsComponent,
    BackButtonComponent,
    ButtonDirective,
    PhotoIconComponent,
    ToggleDialogDirective,
    TvShowGalleryDialogComponent,
  ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsPageComponent {
  public data: InputSignal<ResolvedTvShowDetails> =
    input.required<ResolvedTvShowDetails>();

  public details: Signal<TvShowDetails | null> = computed(() => {
    return this.data().details;
  });
}
