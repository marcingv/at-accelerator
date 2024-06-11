import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Paths } from '@core/routing/paths';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  protected readonly HOME_LINK: string[] = [Paths.ROOT];
  protected readonly SEARCH_LINK: string[] = [Paths.ROOT];
  protected readonly FAVORITES_LINK: string[] = [Paths.ROOT, Paths.FAVORITES];
}
