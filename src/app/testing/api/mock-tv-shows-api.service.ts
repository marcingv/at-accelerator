import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  TvShow,
  TvShowDetails,
  TvShowDetailsResponse,
  TvShowId,
  TvShowsPagedCollectionResponse,
} from '@core/models';
import { TvShowDetailsFactory } from '@testing/factories';

@Injectable()
export class MockTvShowsApiService {
  private readonly COLLECTION_SIZE: number = 100;
  private readonly PAGE_SIZE: number = 10;

  private list: TvShow[] = [];
  private detailsDict: { [id: TvShowId]: TvShowDetails } = {};

  public constructor() {
    const titles: string[] = [
      'Mock Tv Show',
      'Harry Potter',
      'Game of Thrones',
      'Breaking Bad',
    ];

    for (let i = 0; i < this.COLLECTION_SIZE; i++) {
      const details = TvShowDetailsFactory.createInstance({
        name: `${titles[i % titles.length]} #${i + 1}`,
        country: Math.random() > 0.5 ? 'US' : 'JP',
      });

      this.detailsDict[details.id] = details;
      this.list.push(details);
    }
  }

  public popularList(
    page?: number,
  ): Observable<TvShowsPagedCollectionResponse> {
    if (!page) {
      page = 1;
    }

    const start = (page - 1) * this.PAGE_SIZE;
    const end = start + this.PAGE_SIZE;
    const pages = Math.ceil(this.list.length / this.PAGE_SIZE);
    const list: TvShow[] = this.list.slice(start, end);

    const response: TvShowsPagedCollectionResponse = {
      tv_shows: list,
      page: page,
      total: this.list.length + '',
      pages: pages,
    };

    return of(response);
  }

  public search(
    query: string,
    page?: number,
  ): Observable<TvShowsPagedCollectionResponse> {
    if (!page) {
      page = 1;
    }

    const start = (page - 1) * this.PAGE_SIZE;
    const end = start + this.PAGE_SIZE;
    const list: TvShow[] = this.list
      .filter((oneShow) =>
        oneShow.name.toLowerCase().includes(query.toLowerCase()),
      )
      .slice(start, end);
    const pages = Math.ceil(list.length / this.PAGE_SIZE);

    const response: TvShowsPagedCollectionResponse = {
      tv_shows: list,
      page: page,
      total: this.list.length + '',
      pages: pages,
    };

    return of(response);
  }

  public details(query: string | TvShowId): Observable<TvShowDetailsResponse> {
    const response: TvShowDetailsResponse = {
      tvShow: this.detailsDict[query as TvShowId],
    };

    return of(response);
  }
}
