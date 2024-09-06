import * as fromUserPrefs from './user-prefs.reducer';
import { selectUserPrefsState } from './user-prefs.selectors';

describe('UserPrefs Selectors', () => {
  it('should select the feature state', () => {
    const result = selectUserPrefsState({
      [fromUserPrefs.userPrefsFeatureKey]: fromUserPrefs.initialState,
    });

    expect(result).toEqual(fromUserPrefs.initialState);
  });
});
