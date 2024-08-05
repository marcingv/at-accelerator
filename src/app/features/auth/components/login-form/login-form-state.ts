import { LoginFormData } from './login-form-data';
import { NullablePartial } from '@shared/types';

export interface ValidLoginFormState {
  isValid: true;
  formData: LoginFormData;
}

export interface InvalidLoginFormState {
  isValid: false;
  formData: NullablePartial<LoginFormData>;
}

export declare type LoginFormState =
  | ValidLoginFormState
  | InvalidLoginFormState;
