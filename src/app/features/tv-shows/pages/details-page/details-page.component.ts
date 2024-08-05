import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { ErrorPlaceholderComponent } from '@shared/placeholders/error-placeholder';
import { TvShowDetailsComponent } from '@features/tv-shows/components/tv-show-details';
import { BackButtonComponent } from '@shared/buttons/components/back-button';
import { ButtonDirective } from '@shared/buttons/directives';
import { PhotoIconComponent } from '@shared/icons/photo-icon';
import { TvShowDetails } from '@core/models';
import { OpenTvShowGalleryDirective } from '@features/tv-shows/directives';
import { ResolvedTvShowDetails } from '@features/tv-shows/data-access/resolvers';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [
    ErrorPlaceholderComponent,
    TvShowDetailsComponent,
    BackButtonComponent,
    ButtonDirective,
    PhotoIconComponent,
    OpenTvShowGalleryDirective,
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
