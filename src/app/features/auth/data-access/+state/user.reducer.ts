import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { SignedInUser } from '@core/models';

export const userFeatureKey = 'user';

export interface State {
  user: SignedInUser | null;
  signInPending: boolean;
  signInError: string | undefined;
}

export const initialState: State = {
  user: null,
  signInPending: false,
  signInError: undefined,
};

export const reducer = createReducer(
  initialState,
  on(UserActions.login, (state): State => {
    return { ...state, signInPending: true, signInError: undefined };
  }),
  on(UserActions.loginSuccess, (state, action): State => {
    return {
      ...state,
      user: action.user,
      signInPending: false,
    };
  }),
  on(UserActions.loginFailure, (state, action): State => {
    return {
      ...state,
      signInPending: false,
      signInError: action.error.message,
    };
  }),
  on(UserActions.logoutSuccess, (state): State => {
    return {
      ...state,
      user: null,
    };
  }),
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});
