import { fromUserPrefs } from '@features/user-prefs/data-access/+state';

export class UserPrefsStateFactory {
  public static createInstance(
    params?: Partial<fromUserPrefs.State>,
  ): fromUserPrefs.State {
    if (!params) {
      params = {};
    }

    return {
      wishlistShowsIds: [],
      favoriteShowsIds: [],
      ...params,
    };
  }
}
