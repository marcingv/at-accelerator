import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { SignedInUser } from '@core/models';

export const userFeatureKey = 'user';

export interface State {
  user: SignedInUser | null;
}

export const initialState: State = {
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loginSuccess, (state, action): State => {
    return {
      ...state,
      user: action.user,
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
