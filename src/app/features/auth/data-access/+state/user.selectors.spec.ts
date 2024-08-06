import * as fromUser from './user.reducer';
import { selectUserState } from './user.selectors';

describe('User Selectors', () => {
  it('should select the feature state', () => {
    const result = selectUserState({
      [fromUser.userFeatureKey]: fromUser.initialState,
    });

    expect(result).toEqual(fromUser.initialState);
  });
});
