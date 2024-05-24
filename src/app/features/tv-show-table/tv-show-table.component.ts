import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShow } from '@core/models';
import { LoadingSpinnerComponent } from '@shared/loading-spinner';
import { TvShowRowActionsComponent } from '@features/tv-show-table/tv-show-row-actions/tv-show-row-actions.component';

@Component({
  selector: 'app-tv-show-table',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, TvShowRowActionsComponent],
  templateUrl: './tv-show-table.component.html',
  styleUrls: ['./tv-show-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvShowTableComponent {
  @Input({ required: true }) shows: TvShow[] = [];
  @Input() isLoading: boolean = false;
}
