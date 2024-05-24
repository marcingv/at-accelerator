import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ResolvedTvShowDetails } from '@features/tv-shows-data-access/resolvers';
import { ErrorPlaceholderComponent } from '@shared/placeholders/error-placeholder';
import { TvShowDetailsComponent } from '@features/tv-show-details';
import { BackButtonComponent } from '@shared/buttons/components/back-button';

@Component({
  selector: 'app-details-view',
  standalone: true,
  imports: [
    ErrorPlaceholderComponent,
    TvShowDetailsComponent,
    BackButtonComponent,
  ],
  templateUrl: './details-view.component.html',
  styleUrl: './details-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsViewComponent {
  @Input() public data!: ResolvedTvShowDetails;
}
