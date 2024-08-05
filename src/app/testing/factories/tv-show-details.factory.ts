import { TvShowDetails } from '@core/models';
import { TvShowEpisodeFactory } from './tv-show-episode.factory';

export class TvShowDetailsFactory {
  private static lastId: number = 0;

  public static createInstance(params?: Partial<TvShowDetails>): TvShowDetails {
    if (!params) {
      params = {};
    }

    return {
      id: params.id ?? TvShowDetailsFactory.nextId(),
      name: params.name ?? 'Breaking Bad',
      permalink: params.permalink ?? 'breaking-bad',
      url: params.url ?? 'https://www.episodate.com/tv-show/breaking-bad',
      description:
        params.description ??
        "<b>Breaking Bad</b> follows protagonist Walter White, a chemistry teacher who lives in New Mexico with his wife and teenage son who has cerebral palsy. White is diagnosed with Stage III cancer and given a prognosis of two years left to live. With a new sense of fearlessness based on his medical prognosis, and a desire to secure his family's financial security, White chooses to enter a dangerous world of drugs and crime and ascends to power in this world. The series explores how a fatal diagnosis such as White's releases a typical man from the daily concerns and constraints of normal society and follows his transformation from mild family man to a kingpin of the drug trade.",
      description_source: params.description_source ?? null,
      start_date: params.start_date ?? '2008-01-20',
      end_date: params.end_date ?? null,
      country: params.country ?? 'US',
      status: params.status ?? 'Ended',
      runtime: params.runtime ?? 60,
      network: params.network ?? 'AMC',
      youtube_link: params.youtube_link ?? null,
      image_path:
        params.image_path ??
        'https://static.episodate.com/images/tv-show/full/17658.jpg',
      image_thumbnail_path:
        params.image_thumbnail_path ?? '/assets/images/movie-placeholder.png',
      rating: params.rating ?? '9.4068',
      rating_count: params.rating_count ?? '118',
      countdown: params.countdown ?? null,
      genres: params.genres ?? ['Crime', 'Drama', 'Thriller'],
      pictures: params.pictures ?? [
        'https://localhost/images/episode/17658-294.jpg',
        'https://localhost/images/episode/17658-740.jpg',
      ],
      episodes: params.episodes ?? [
        TvShowEpisodeFactory.createInstance({ season: 1, episode: 1 }),
        TvShowEpisodeFactory.createInstance({ season: 2, episode: 1 }),
        TvShowEpisodeFactory.createInstance({ season: 3, episode: 1 }),
        TvShowEpisodeFactory.createInstance({ season: 4, episode: 1 }),
        TvShowEpisodeFactory.createInstance({ season: 5, episode: 1 }),
      ],
    };
  }

  public static nextId(): number {
    return ++TvShowDetailsFactory.lastId;
  }
}
