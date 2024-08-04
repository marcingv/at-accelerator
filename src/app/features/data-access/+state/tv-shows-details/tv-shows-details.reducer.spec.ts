import { initialState, reducer } from './tv-shows-details.reducer';
import { Action } from '@ngrx/store';

describe('TvShowsDetails Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
