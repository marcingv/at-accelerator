import { initialState, reducer } from './wishlist.reducer';
import { Action } from '@ngrx/store';

describe('Wishlist Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
