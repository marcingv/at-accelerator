import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ResolvedTvShowDetails } from '@features/data-access/resolvers';
import { ErrorPlaceholderComponent } from '@shared/placeholders/error-placeholder';
import { TvShowDetailsComponent } from 'src/app/features/tv-shows/components/tv-show-details';
import { BackButtonComponent } from '@shared/buttons/components/back-button';
import { ButtonDirective } from '@shared/buttons/directives';
import { PhotoIconComponent } from '@shared/icons/photo-icon';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [
    ErrorPlaceholderComponent,
    TvShowDetailsComponent,
    BackButtonComponent,
    ButtonDirective,
    PhotoIconComponent,
  ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsPageComponent {
  @Input() public data!: ResolvedTvShowDetails;
}
