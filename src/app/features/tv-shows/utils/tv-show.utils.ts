import { Episode, Status, TvShow, TvShowDetails } from '@core/models';

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

export const sortTvShowsByStatus = (a: TvShow, b: TvShow): number => {
  const ORDER: Record<Status, number> = {
    Running: 1,
    'New Series': 2,
    'Canceled/Ended': 3,
    Ended: 4,
    'To Be Determined': 5,
  };

  const aOrder: number = a.status ? ORDER[a.status] : 999;
  const bOrder: number = b.status ? ORDER[b.status] : 999;

  if (aOrder === bOrder) {
    return 0;
  }

  return aOrder < bOrder ? -1 : 1;
};

export const sortTvShowsByNextEpisode = (
  a: TvShowDetails,
  b: TvShowDetails,
): number => {
  const aEpisode: Episode | null = getNextEpisode(a);
  const bEpisode: Episode | null = getNextEpisode(b);

  if (!aEpisode && !bEpisode) {
    return 0;
  }
  if (aEpisode && !bEpisode) {
    return -1;
  }
  if (!aEpisode && bEpisode) {
    return 1;
  }

  const aEpisodeTime = new Date(aEpisode!.air_date).getTime();
  const bEpisodeTime = new Date(bEpisode!.air_date).getTime();

  return aEpisodeTime < bEpisodeTime ? -1 : 1;
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
