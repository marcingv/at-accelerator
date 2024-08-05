import {
  Directive,
  effect,
  inject,
  input,
  Signal,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserService } from '@features/auth/data-access/services';
import { SignedInUser } from '@core/models';

@Directive({
  selector: '[appIsGuest]',
  standalone: true,
})
export class IsGuestDirective {
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly userService: UserService = inject(UserService);

  private readonly user: Signal<SignedInUser | null> = this.userService.user;

  public appIsGuest = input<
    { notGuestTemplate: TemplateRef<unknown> } | string
  >();

  public constructor() {
    effect(() => {
      const user = this.user();

      this.viewContainerRef.clear();

      const params = this.appIsGuest();

      if (!user) {
        this.viewContainerRef.createEmbeddedView(this.templateRef, {
          $implicit: user,
        });
      } else if (
        params &&
        typeof params === 'object' &&
        params.notGuestTemplate
      ) {
        this.viewContainerRef.createEmbeddedView(params.notGuestTemplate);
      }
    });
  }
}
