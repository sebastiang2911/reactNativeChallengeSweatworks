import { Movie } from '../../src/data/movies';

const movieFixture: Movie = {
  id: 'movie-1',
  title: 'The Matrix',
  year: 1999,
  duration: 136,
  genre: 'Sci-Fi',
  rating: 8.7,
  accent: '#00FFAA',
  posterPath: '/poster.jpg',
  backdropPath: '/backdrop.jpg',
  overview: 'A hacker discovers the nature of reality.',
  trailerUrl: 'https://youtube.com/watch?v=test-trailer',
};

export { movieFixture };
