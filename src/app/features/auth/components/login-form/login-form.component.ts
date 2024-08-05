import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnChanges,
  output,
  SimpleChanges,
} from '@angular/core';
import { FormControlComponent, FormControlDirective } from '@shared/forms';
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
    FormControlComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnChanges {
  protected usernameCtrl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(5),
  ]);

  protected passwordCtrl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(5),
  ]);

  protected formGroup = new FormGroup({
    username: this.usernameCtrl,
    password: this.passwordCtrl,
  });

  protected usernameErrors = toSignal(
    this.usernameCtrl.statusChanges.pipe(map(() => this.usernameCtrl.errors)),
  );

  protected passwordErrors = toSignal(
    this.passwordCtrl.statusChanges.pipe(map(() => this.passwordCtrl.errors)),
  );

  public showSubmitButton = input<boolean>(true);
  public disableSubmitButton = input<boolean>(false);
  public formDisabled = input<boolean>(false);
  public initialFormData = input<Partial<LoginFormData>>();
  public formStateChange = output<LoginFormState>();
  public submitForm = output<ValidLoginFormState>();

  public constructor() {
    this.registerFormStateNotifications();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const initialFormDataChange = changes['initialFormData'];
    if (initialFormDataChange) {
      this.formGroup.patchValue(initialFormDataChange.currentValue);
    }

    const formDisabledChange = changes['formDisabled'];
    if (formDisabledChange) {
      formDisabledChange.currentValue ? this.disableForm() : this.enableForm();
    }
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

  public disableForm(): void {
    this.formGroup.disable();
  }

  public enableForm(): void {
    this.formGroup.enable();
  }
}
