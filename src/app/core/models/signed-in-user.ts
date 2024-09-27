export declare type Username = string;

export interface SignedInUser {
  username: Username;
  signInTime: number;
  role: 'user';
}
