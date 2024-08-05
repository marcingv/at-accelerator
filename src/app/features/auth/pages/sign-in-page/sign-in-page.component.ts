import {
  ChangeDetectionStrategy,
  Component,
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

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [CardComponent, LoginFormComponent, JsonPipe, ButtonDirective],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPageComponent {
  protected initialFormData: WritableSignal<Partial<LoginFormData>> = signal<
    Partial<LoginFormData>
  >({ username: 'marcingv' });

  protected formState = signal<LoginFormState | undefined>(undefined);

  protected onFormStateChange(formState: LoginFormState): void {
    this.formState.set(formState);
  }

  protected onSubmitForm(state: ValidLoginFormState): void {
    console.warn('submit', state);
  }
}
