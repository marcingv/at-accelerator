import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
} from '@angular/core';
import { FormControlDirective } from '@shared/forms';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { LoginFormData } from '@features/auth/components/login-form/login-form-data';
import { JsonPipe } from '@angular/common';
import { map, tap } from 'rxjs';
import {
  LoginFormState,
  ValidLoginFormState,
} from '@features/auth/components/login-form/login-form-state';
import { ButtonDirective } from '@shared/buttons/directives';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormControlDirective,
    ReactiveFormsModule,
    JsonPipe,
    ButtonDirective,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  protected formGroup = new FormGroup({
    username: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  protected usernameErrors = toSignal(
    this.formGroup.controls.username.statusChanges.pipe(
      map(() => this.formGroup.controls.username.errors),
    ),
  );

  protected passwordErrors = toSignal(
    this.formGroup.controls.password.statusChanges.pipe(
      map(() => this.formGroup.controls.password.errors),
    ),
  );

  public showSubmitButton = input<boolean>(true);
  public disableSubmitButton = input<boolean>(false);
  public initialFormData = input<Partial<LoginFormData>>();
  public formStateChange = output<LoginFormState>();
  public submitForm = output<ValidLoginFormState>();

  public constructor() {
    this.setUpInitialDataUpdates();
    this.registerFormStateNotifications();
  }

  private setUpInitialDataUpdates(): void {
    effect(() => {
      const initialFormData: Partial<LoginFormData> | undefined =
        this.initialFormData();

      if (!initialFormData) {
        return;
      }

      this.formGroup.patchValue(initialFormData);
    });
  }

  private registerFormStateNotifications(): void {
    this.formGroup.valueChanges
      .pipe(
        tap(() => {
          this.formStateChange.emit(this.getFormState());
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  protected onSubmit(): void {
    const state = this.getFormState();

    if (!state.isValid) {
      return;
    }

    this.submitForm.emit(state);
  }

  protected onEnterKeydown(): void {
    if (this.showSubmitButton()) {
      return;
    }

    this.triggerSubmit();
  }

  public triggerSubmit(): void {
    this.onSubmit();
  }

  public getFormState(): LoginFormState {
    if (this.formGroup.valid) {
      return {
        isValid: true,
        formData: this.formGroup.value as LoginFormData,
      };
    } else {
      return {
        isValid: false,
        formData: this.formGroup.value,
      };
    }
  }

  public resetForm(): void {
    this.formGroup.reset();
  }
}
