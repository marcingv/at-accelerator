import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';
import { SignedInUser } from '@core/models';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey,
);

export const selectUser = createSelector(
  selectUserState,
  (state: fromUser.State): SignedInUser | null => state.user,
);

export const selectIsSignInPending = createSelector(
  selectUserState,
  (state: fromUser.State): boolean => state.signInPending,
);

export const selectSignInError = createSelector(
  selectUserState,
  (state: fromUser.State): string | undefined => state.signInError,
);

export const selectIsLoggedIn = createSelector(
  selectUser,
  (user: SignedInUser | null): boolean => !!user,
);

export const selectIsGuest = createSelector(
  selectIsLoggedIn,
  (isLoggedIn: boolean): boolean => !isLoggedIn,
);
