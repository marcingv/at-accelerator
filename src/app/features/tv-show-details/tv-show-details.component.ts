import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TvShowDetails } from '@core/models';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-tv-show-details',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './tv-show-details.component.html',
  styleUrl: './tv-show-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvShowDetailsComponent {
  @Input({ required: true }) public details!: TvShowDetails;
}
