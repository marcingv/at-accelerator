import { Username } from '@core/models';
import { State } from '../user-prefs.reducer';

export interface UsersPrefsSettings {
  [username: Username | 'guest']: State;
}
