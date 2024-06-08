import { Episode, TvShowDetails } from '@core/models';

export const getNextEpisode = (
  tvShow: TvShowDetails,
  relativeToDate: Date = new Date(),
): Episode | null => {
  if (!tvShow.episodes || !tvShow.episodes.length) {
    return null;
  }

  const relativeToTime: number = relativeToDate.getTime();
  const episodes: Episode[] = tvShow.episodes
    .slice()
    .sort(sortEpisodesByDateAsc);

  return (
    episodes.find((oneEpisode: Episode) => {
      const episodeAirTime: number = new Date(oneEpisode.air_date).getTime();

      return episodeAirTime >= relativeToTime;
    }) ?? null
  );
};

export const sortEpisodes = (episodes: Episode[]): Episode[] => {
  return episodes.slice().sort(sortEpisodesByDateAsc);
};

export const sortEpisodesByDateAsc = (a: Episode, b: Episode): number => {
  const aTime: number = new Date(a.air_date).getTime();
  const bTime: number = new Date(b.air_date).getTime();

  if (aTime === bTime) {
    return 0;
  }

  return aTime < bTime ? -1 : 1;
};
