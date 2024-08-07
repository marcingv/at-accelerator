import * as fromTvShowsFavorites from './tv-shows-favorites.reducer';
import { initialState } from './tv-shows-favorites.reducer';
import { selectTvShowsFavoritesState } from './tv-shows-favorites.selectors';

describe('TvShowsFavorites Selectors', () => {
  it('should select the feature state', () => {
    const result = selectTvShowsFavoritesState({
      [fromTvShowsFavorites.tvShowsFavoritesFeatureKey]: initialState,
    });

    expect(result).toEqual(initialState);
  });
});
