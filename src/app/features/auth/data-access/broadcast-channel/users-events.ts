import { SignedInUser } from '@core/models';

export type UsersEvent = UserSignedInEvent | UserSignedOutEvent;

export interface UserSignedInEvent {
  type: 'user-signed-in';
  user: SignedInUser;
}

export interface UserSignedOutEvent {
  type: 'user-signed-out';
}
