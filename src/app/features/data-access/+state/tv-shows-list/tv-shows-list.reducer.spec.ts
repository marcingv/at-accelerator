import { initialState, reducer } from './tv-shows-list.reducer';
import { Action } from '@ngrx/store';

describe('TvShowsList Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
