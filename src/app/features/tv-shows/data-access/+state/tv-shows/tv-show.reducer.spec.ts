import { initialState, reducer } from './tv-show.reducer';
import { Action } from '@ngrx/store';

describe('TvShow Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
