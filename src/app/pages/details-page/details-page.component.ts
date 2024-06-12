import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ResolvedTvShowDetails } from '@features/data-access/resolvers';
import { ErrorPlaceholderComponent } from '@shared/placeholders/error-placeholder';
import { TvShowDetailsComponent } from 'src/app/features/tv-shows/components/tv-show-details';
import { BackButtonComponent } from '@shared/buttons/components/back-button';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [
    ErrorPlaceholderComponent,
    TvShowDetailsComponent,
    BackButtonComponent,
  ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsPageComponent {
  @Input() public data!: ResolvedTvShowDetails;
}
