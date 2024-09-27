import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { State } from '../user-prefs.reducer';

export const UserPrefsActions = createActionGroup({
  source: 'UserPrefs',
  events: {
    Set: props<{ state: State }>(),
    Clear: emptyProps(),
    'Save Settings': emptyProps(),
    'Load Settings': emptyProps(),
  },
});
