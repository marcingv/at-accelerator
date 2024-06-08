import { computed, inject, Injectable, Signal } from '@angular/core';
import { BrowserStorage, LocalStorageService } from '@core/storage';
import { FavouriteTvShowsDictionary } from '@features/tv-shows-data-access';
import { TvShow, TvShowId } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class TvShowsFavouritesService {
  private readonly STORAGE_KEY = 'favourites-tv-shows';

  private storage: BrowserStorage = inject(LocalStorageService);

  private favouritesDictSignal =
    this.storage.getItemSignal<FavouriteTvShowsDictionary>(this.STORAGE_KEY);

  public listSignal: Signal<TvShow[]> = computed(() => {
    const dictionary = this.favouritesDictSignal();
    if (!dictionary) {
      return [];
    }

    return Object.values(dictionary);
  });

  public idsSignal: Signal<number[]> = computed(() => {
    return this.listSignal().map((oneTvShow: TvShow) => oneTvShow.id);
  });

  public clearAll(): void {
    this.storage.clearItem(this.STORAGE_KEY);
  }

  public toggle(tvShow: TvShow): void {
    this.isFavourite(tvShow.id) ? this.remove(tvShow.id) : this.add(tvShow);
  }

  public add(tvShow: TvShow): void {
    let dictionary = this.favouritesDictSignal();
    if (!dictionary) {
      dictionary = {};
    }

    this.storage.setItem(this.STORAGE_KEY, {
      ...dictionary,
      [tvShow.id]: tvShow,
    });
  }

  public remove(tvShowId: TvShowId): void {
    let dictionary = this.favouritesDictSignal();
    if (!dictionary) {
      dictionary = {};
    }
    if (dictionary[tvShowId]) {
      delete dictionary[tvShowId];
    }

    this.storage.setItem(this.STORAGE_KEY, { ...dictionary });
  }

  public isFavourite(tvShowId: TvShowId): Signal<boolean> {
    return computed<boolean>(() => {
      const dict = this.favouritesDictSignal();

      return !!dict && !!dict[tvShowId];
    });
  }
}
