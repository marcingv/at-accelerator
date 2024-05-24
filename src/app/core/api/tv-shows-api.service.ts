import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  TvShow,
  TvShowDetailsResponse,
  TvShowsPagedCollectionResponse,
} from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TvShowsApiService {
  private readonly API_URL = 'https://www.episodate.com/api';
  private readonly MOST_POPULAR_ENDPOINT = '/most-popular';
  private readonly SEARCH_ENDPOINT = '/search';
  private readonly DETAILS_ENDPOINT = '/show-details';

  public constructor(private http: HttpClient) {}

  public popularList(
    page?: number,
  ): Observable<TvShowsPagedCollectionResponse> {
    const url = this.getEndpointUrl(this.MOST_POPULAR_ENDPOINT);
    const params: { page?: number } = {};

    if (page) {
      params['page'] = page;
    }

    return this.http.get<TvShowsPagedCollectionResponse>(url, {
      params: params,
    });
  }

  public search(
    query: string,
    page?: number,
  ): Observable<TvShowsPagedCollectionResponse> {
    const url = this.getEndpointUrl(this.SEARCH_ENDPOINT);
    const params: {
      q: string;
      page?: number;
    } = {
      q: query,
    };

    if (page) {
      params['page'] = page;
    }

    return this.http.get<TvShowsPagedCollectionResponse>(url, {
      params: params,
    });
  }

  public details(
    query: string | TvShow['id'],
  ): Observable<TvShowDetailsResponse> {
    const url = this.getEndpointUrl(this.DETAILS_ENDPOINT);
    const params: { q: string } = { q: query.toString() };

    return this.http.get<TvShowDetailsResponse>(url, { params: params });
  }

  private getEndpointUrl(endpoint: string): string {
    return this.API_URL + endpoint;
  }
}
