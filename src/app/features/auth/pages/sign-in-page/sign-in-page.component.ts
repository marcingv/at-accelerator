import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { CardComponent } from '@shared/cards';
import {
  LoginFormComponent,
  LoginFormData,
  LoginFormState,
  ValidLoginFormState,
} from '@features/auth/components/login-form';
import { JsonPipe } from '@angular/common';
import { ButtonDirective } from '@shared/buttons/directives';
import { UserService } from '@features/auth/data-access/services';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [CardComponent, LoginFormComponent, JsonPipe, ButtonDirective],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPageComponent {
  private readonly userService: UserService = inject(UserService);

  protected readonly signInError = this.userService.signInError;
  protected readonly signInPending: Signal<boolean> =
    this.userService.signInPending;

  protected initialFormData: WritableSignal<Partial<LoginFormData>> = signal<
    Partial<LoginFormData>
  >({ username: 'marcingv', password: 'haslo' });

  protected formState = signal<LoginFormState | undefined>(undefined);

  protected onFormStateChange(formState: LoginFormState): void {
    this.formState.set(formState);
  }

  protected onSubmitForm(state: ValidLoginFormState): void {
    this.userService.signIn(state.formData.username, state.formData.password);
  }
}
