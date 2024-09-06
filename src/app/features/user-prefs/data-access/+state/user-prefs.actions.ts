import { createActionGroup, emptyProps } from '@ngrx/store';

export const UserPrefsActions = createActionGroup({
  source: 'UserPrefs',
  events: {
    Clear: emptyProps(),
  },
});
