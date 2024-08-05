import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Paths } from '@core/routing/paths';
import { TranslationKey } from '@core/translations';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink, TranslocoPipe],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  protected readonly SEARCH_LABEL: TranslationKey = 'header.menu.search';
  protected readonly FAVORITES_LABEL: TranslationKey = 'header.menu.favorites';
  protected readonly WISHLIST_LABEL: TranslationKey = 'header.menu.wishlist';

  protected readonly HOME_LINK: string[] = [Paths.ROOT];
  protected readonly SEARCH_LINK: string[] = [Paths.ROOT, Paths.LIST];
  protected readonly FAVORITES_LINK: string[] = [Paths.ROOT, Paths.FAVORITES];
  protected readonly WISHLIST_LINK: string[] = [Paths.ROOT, Paths.WISHLIST];
}
