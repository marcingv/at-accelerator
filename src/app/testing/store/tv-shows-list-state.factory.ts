import { fromTvShowsList } from '@features/search/data-access/+state';

export class TvShowsListStateFactory {
  public static createInstance(
    params?: Partial<fromTvShowsList.State>,
  ): fromTvShowsList.State {
    if (!params) {
      params = {};
    }

    return {
      ids: params.ids ?? [],
      page: params.page ?? 0,
      query: params.query ?? undefined,
      isLoading: params.isLoading ?? false,
      total: params.total ?? 0,
      pages: params.pages ?? 0,
    };
  }
}
