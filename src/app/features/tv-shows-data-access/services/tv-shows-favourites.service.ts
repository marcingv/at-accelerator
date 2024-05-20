import { computed, inject, Injectable, Signal } from '@angular/core';
import { BrowserStorage, LocalStorageService } from "@core/storage";
import { FavouriteTvShowsDictionary } from "@features/tv-shows-data-access";
import { TvShow } from "@core/models";

@Injectable({
  providedIn: 'root'
})
export class TvShowsFavouritesService {
  private readonly STORAGE_KEY = 'favourites-tv-shows';

  private storage: BrowserStorage = inject(LocalStorageService);

  private favouritesDictSignal = this.storage.getItemSignal<FavouriteTvShowsDictionary>(this.STORAGE_KEY);

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

  public add(tvShow: TvShow): void {
    let dictionary = this.favouritesDictSignal();
    if (!dictionary) {
      dictionary = {};
    }
    dictionary[tvShow.id] = tvShow;

    this.storage.setItem(this.STORAGE_KEY, dictionary);
  }

  public remove(tvShowId: number): void {
    let dictionary = this.favouritesDictSignal();
    if (!dictionary) {
      dictionary = {};
    }
    if (dictionary[tvShowId]) {
      delete dictionary[tvShowId];
    }

    this.storage.setItem(this.STORAGE_KEY, dictionary);
  }

  public isFavourite(tvShowId: number): Signal<boolean> {
    return computed<boolean>(() => {
      const dict = this.favouritesDictSignal();

      return !!dict && !!dict[tvShowId];
    });
  }
}
