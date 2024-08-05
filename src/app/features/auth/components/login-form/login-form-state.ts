import { LoginFormData } from './login-form-data';

export interface ValidLoginFormState {
  isValid: true;
  formData: LoginFormData;
}

export interface InvalidLoginFormState {
  isValid: false;
  formData: Partial<LoginFormData>;
}

export declare type LoginFormState =
  | ValidLoginFormState
  | InvalidLoginFormState;
