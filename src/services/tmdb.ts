import axios from 'axios';
import FastImage from 'react-native-fast-image';
import Keys from 'react-native-keys';

import {
  categories,
  categoryMoviesFallback,
  featuredMoviesFallback,
  Movie,
  searchMoviesFallback,
} from '../data/movies';

const TMDB_BASE_URL = Keys.TMDB_BASE_URL;
const TMDB_IMAGE_BASE_URL = Keys.TMDB_IMAGE_BASE_URL;
const TMDB_READ_ACCESS_TOKEN = getSecureKey('TMDB_READ_ACCESS_TOKEN');

const accentPalette = [
  '#C98B12',
  '#D94A48',
  '#6A7BEF',
  '#53C7FF',
  '#2DB7C4',
  '#F08E42',
  '#E85E63',
  '#8D9AA7',
];

const categoryEndpoints: Record<(typeof categories)[number], string> = {
  'Now playing': '/movie/now_playing',
  Upcoming: '/movie/upcoming',
  'Top rated': '/movie/top_rated',
};

type GenreResponse = {
  genres: Array<{
    id: number;
    name: string;
  }>;
};

type TmdbMovie = {
  id: number;
  title: string;
  release_date?: string;
  vote_average: number;
  overview?: string;
  genre_ids?: number[];
  genres?: Array<{ id: number; name: string }>;
  runtime?: number;
  poster_path?: string | null;
  backdrop_path?: string | null;
  videos?: {
    results?: TmdbVideo[];
  };
};

type TmdbVideo = {
  key: string;
  official?: boolean;
  published_at?: string;
  site: string;
  type: string;
};

type TmdbListResponse = {
  results: TmdbMovie[];
};

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

let cachedGenres: Record<number, string> | null = null;

function getSecureKey(key: string) {
  try {
    return Keys.secureFor(key as never)?.trim() ?? '';
  } catch {
    return '';
  }
}

function isTmdbConfigured() {
  return TMDB_READ_ACCESS_TOKEN.trim().length > 0;
}

function getAccent(index: number) {
  return accentPalette[index % accentPalette.length];
}

function getYear(releaseDate?: string) {
  if (!releaseDate) {
    return undefined;
  }

  const year = Number(releaseDate.slice(0, 4));
  return Number.isNaN(year) ? undefined : year;
}

function getTmdbImageUrl(
  imagePath?: string | null,
  size: 'w342' | 'w500' | 'w780' = 'w500',
) {
  if (!imagePath) {
    return null;
  }

  const normalizedBaseUrl = TMDB_IMAGE_BASE_URL.replace(/\/$/, '');
  const sizedBaseUrl = normalizedBaseUrl.match(/\/w\d+$/)
    ? normalizedBaseUrl.replace(/\/w\d+$/, `/${size}`)
    : `${normalizedBaseUrl}/${size}`;

  return `${sizedBaseUrl}${imagePath}`;
}

async function getGenresMap() {
  if (cachedGenres) {
    return cachedGenres;
  }

  const response = await api.get<GenreResponse>('/genre/movie/list', {
    headers: {
      Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
    },
  });

  cachedGenres = response.data.genres.reduce<Record<number, string>>((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});

  return cachedGenres;
}

function mapMovie(movie: TmdbMovie, index: number, genresMap: Record<number, string>): Movie {
  const genre =
    movie.genres?.[0]?.name ??
    movie.genre_ids?.map(genreId => genresMap[genreId]).find(Boolean);
  const trailer = selectTrailer(movie.videos?.results);

  return {
    id: String(movie.id),
    title: movie.title,
    year: getYear(movie.release_date),
    duration: movie.runtime,
    genre,
    rating: Number(movie.vote_average.toFixed(1)),
    accent: getAccent(index),
    posterPath: movie.poster_path ?? null,
    backdropPath: movie.backdrop_path ?? null,
    overview: movie.overview,
    trailerUrl: trailer ? getYoutubeVideoUrl(trailer.key) : undefined,
  };
}

function getYoutubeVideoUrl(videoKey: string) {
  return `https://www.youtube.com/watch?v=${videoKey}`;
}

function getVideoPriority(video: TmdbVideo) {
  if (video.type === 'Trailer' && video.official) {
    return 0;
  }

  if (video.type === 'Trailer') {
    return 1;
  }

  if (video.type === 'Teaser') {
    return 2;
  }

  if (video.type === 'Clip') {
    return 3;
  }

  return 4;
}

function selectTrailer(videos?: TmdbVideo[]) {
  if (!videos?.length) {
    return null;
  }

  return (
    videos
      .filter(video => video.site === 'YouTube')
      .sort((left, right) => {
        const priorityDelta = getVideoPriority(left) - getVideoPriority(right);

        if (priorityDelta !== 0) {
          return priorityDelta;
        }

        const leftPublished = left.published_at ? Date.parse(left.published_at) : 0;
        const rightPublished = right.published_at ? Date.parse(right.published_at) : 0;

        return rightPublished - leftPublished;
      })[0] ?? null
  );
}

async function fetchCategory(category: (typeof categories)[number]) {
  const genresMap = await getGenresMap();
  const response = await api.get<TmdbListResponse>(categoryEndpoints[category], {
    headers: {
      Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
    },
  });

  return response.data.results.map((movie, index) => mapMovie(movie, index, genresMap));
}

async function fetchHomeMovies() {
  if (!isTmdbConfigured()) {
    return {
      featuredMovies: featuredMoviesFallback,
      categoryMovies: categoryMoviesFallback,
      usingFallback: true,
    };
  }

  try {
    const [nowPlaying, upcoming, topRated] = await Promise.all(
      categories.map(category => fetchCategory(category)),
    );

    return {
      featuredMovies: nowPlaying.slice(0, 3),
      categoryMovies: {
        'Now playing': nowPlaying,
        Upcoming: upcoming,
        'Top rated': topRated,
      },
      usingFallback: false,
    };
  } catch {
    return {
      featuredMovies: featuredMoviesFallback,
      categoryMovies: categoryMoviesFallback,
      usingFallback: true,
    };
  }
}

async function searchTmdbMovies(query: string) {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return {
      results: [],
      usingFallback: false,
    };
  }

  if (!isTmdbConfigured()) {
    return {
      results: searchMoviesFallback.filter(movie =>
        movie.title.toLowerCase().includes(normalizedQuery.toLowerCase()),
      ),
      usingFallback: true,
    };
  }

  try {
    const genresMap = await getGenresMap();
    const response = await api.get<TmdbListResponse>('/search/movie', {
      headers: {
        Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
      },
      params: {
        query: normalizedQuery,
        include_adult: false,
      },
    });

    return {
      results: response.data.results.map((movie, index) => mapMovie(movie, index, genresMap)),
      usingFallback: false,
    };
  } catch {
    return {
      results: searchMoviesFallback.filter(movie =>
        movie.title.toLowerCase().includes(normalizedQuery.toLowerCase()),
      ),
      usingFallback: true,
    };
  }
}

async function fetchMovieDetail(movieId: string, fallbackMovie?: Movie) {
  if (!isTmdbConfigured()) {
    return fallbackMovie ?? null;
  }

  try {
    const genresMap = await getGenresMap();
    const response = await api.get<TmdbMovie>(`/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
      },
      params: {
        append_to_response: 'videos',
      },
    });
    const mappedMovie = mapMovie(response.data, 0, genresMap);

    return {
      ...fallbackMovie,
      ...mappedMovie,
      accent: fallbackMovie?.accent ?? mappedMovie.accent,
    };
  } catch {
    return fallbackMovie ?? null;
  }
}

function preloadMovieImages(movies: Movie[], size: 'w342' | 'w500' | 'w780' = 'w500') {
  const sources = movies
    .map(movie => getTmdbImageUrl(movie.posterPath, size))
    .filter((uri): uri is string => Boolean(uri))
    .map(uri => ({
      uri,
      cache: FastImage.cacheControl.immutable,
      priority: FastImage.priority.normal,
    }));

  if (sources.length === 0) {
    return;
  }

  FastImage.preload(sources);
}

export {
  fetchHomeMovies,
  fetchMovieDetail,
  getTmdbImageUrl,
  isTmdbConfigured,
  preloadMovieImages,
  searchTmdbMovies,
};
