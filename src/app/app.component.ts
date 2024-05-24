import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Paths } from '@core/routing/paths';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly HOME_LINK: string[] = [Paths.ROOT];
  protected readonly SEARCH_LINK: string[] = [Paths.ROOT];
  protected readonly FAVORITES_LINK: string[] = [Paths.ROOT, Paths.FAVORITES];
}
