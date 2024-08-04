import * as fromTvShowsList from './tv-shows-list.reducer';
import { selectTvShowsListState } from './tv-shows-list.selectors';

describe('TvShowsList Selectors', () => {
  it('should select the feature state', () => {
    const result = selectTvShowsListState({
      [fromTvShowsList.tvShowsListFeatureKey]: fromTvShowsList.initialState,
    });

    expect(result).toEqual(fromTvShowsList.initialState);
  });
});
