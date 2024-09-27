import { initialState, reducer } from './user-prefs.reducer';
import { Action } from '@ngrx/store';

describe('UserPrefs Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
