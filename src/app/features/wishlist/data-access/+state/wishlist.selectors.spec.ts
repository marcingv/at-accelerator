import * as fromWishlist from './wishlist.reducer';
import { selectWishlistState } from './wishlist.selectors';

describe('Wishlist Selectors', () => {
  it('should select the feature state', () => {
    const result = selectWishlistState({
      [fromWishlist.wishlistFeatureKey]: fromWishlist.initialState,
    });

    expect(result).toEqual(fromWishlist.initialState);
  });
});
