import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { UserService } from '@features/auth/data-access/services';
import { TranslationKey } from '@core/translations';
import { Paths } from '@core/routing/paths';
import { SignedInUser } from '@core/models';

@Component({
  selector: 'app-user-signing',
  standalone: true,
  imports: [RouterLinkActive, TranslocoPipe, RouterLink],
  templateUrl: './user-signing.component.html',
  styleUrl: './user-signing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSigningComponent {
  private readonly userService: UserService = inject(UserService);

  protected readonly SIGN_IN_LABEL: TranslationKey = 'header.menu.signIn';

  protected readonly SIGN_IN_LINK: string[] = [
    Paths.ROOT,
    Paths.AUTH,
    Paths.SIGN_IN,
  ];

  protected readonly user: Signal<SignedInUser | null> = this.userService.user;

  protected signOutUser(): void {
    this.userService.signOut();
  }
}
