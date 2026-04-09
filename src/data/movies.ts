export type Movie = {
  id: string;
  title: string;
  year?: number;
  duration?: number;
  genre?: string;
  rating: number;
  accent: string;
  posterPath?: string | null;
  backdropPath?: string | null;
  overview?: string;
};

export const categories = ['Now playing', 'Upcoming', 'Top rated'] as const;

export const featuredMoviesFallback: Movie[] = [
  {
    id: 'jurassic-world',
    title: 'Jurassic World Dominion',
    year: 2022,
    duration: 147,
    genre: 'Adventure',
    rating: 7.2,
    accent: '#C98B12',
    overview:
      'Four years after Isla Nublar was destroyed, dinosaurs now live and hunt alongside humans all over the world.',
  },
  {
    id: 'spider-man-no-way-home',
    title: 'Spider-Man: No Way Home',
    year: 2021,
    duration: 148,
    genre: 'Action',
    rating: 8.5,
    accent: '#D94A48',
    overview:
      'Peter Parker asks Doctor Strange for help after his identity is revealed, but the spell tears open the multiverse.',
  },
  {
    id: 'batman',
    title: 'The Batman',
    year: 2022,
    duration: 176,
    genre: 'Action',
    rating: 7.9,
    accent: '#6A7BEF',
    overview:
      'Batman descends into Gotham’s underworld when a sadistic killer leaves behind a trail of cryptic clues.',
  },
];

export const categoryMoviesFallback: Record<(typeof categories)[number], Movie[]> = {
  'Now playing': [
    {
      id: 'doctor-strange',
      title: 'Doctor Strange',
      year: 2022,
      duration: 126,
      genre: 'Fantasy',
      rating: 7.6,
      accent: '#E85E63',
      overview: 'Doctor Strange faces a threat that spans multiple realities.',
    },
    {
      id: 'dumbledore',
      title: 'Dumbledore',
      year: 2022,
      duration: 143,
      genre: 'Fantasy',
      rating: 6.4,
      accent: '#C08B42',
      overview: 'Dumbledore recruits Newt Scamander to stand against Grindelwald.',
    },
    {
      id: 'dog',
      title: 'Dog',
      year: 2022,
      duration: 101,
      genre: 'Comedy',
      rating: 6.7,
      accent: '#8D9AA7',
      overview: 'A former Army Ranger and a military dog take a road trip together.',
    },
    {
      id: 'sonic',
      title: 'Sonic 2',
      year: 2022,
      duration: 122,
      genre: 'Family',
      rating: 7.0,
      accent: '#1D74F5',
      overview: 'Sonic returns for another mission when Robotnik finds a powerful ally.',
    },
    {
      id: 'lost-city',
      title: 'The Lost City',
      year: 2022,
      duration: 112,
      genre: 'Adventure',
      rating: 6.1,
      accent: '#E7B85E',
      overview: 'An author and a cover model get pulled into a real jungle adventure.',
    },
    {
      id: 'avengers',
      title: 'Avengers Endgame',
      year: 2019,
      duration: 181,
      genre: 'Action',
      rating: 8.4,
      accent: '#6C4CF1',
      overview: 'The Avengers attempt one final mission to reverse Thanos’ snap.',
    },
  ],
  Upcoming: [
    {
      id: 'flash',
      title: 'The Flash',
      year: 2026,
      duration: 130,
      genre: 'Action',
      rating: 8.0,
      accent: '#E3AA38',
      overview: 'Barry Allen changes the past and destabilizes the future.',
    },
    {
      id: 'inside-out',
      title: 'Inside Out 3',
      year: 2026,
      duration: 104,
      genre: 'Animation',
      rating: 8.2,
      accent: '#53C7FF',
      overview: 'New emotions appear as Riley grows into a new phase of life.',
    },
    {
      id: 'avatar',
      title: 'Avatar Frontiers',
      year: 2026,
      duration: 166,
      genre: 'Sci-Fi',
      rating: 8.1,
      accent: '#2DB7C4',
      overview: 'A return to Pandora sparks another massive conflict.',
    },
  ],
  'Top rated': [
    {
      id: 'interstellar',
      title: 'Interstellar',
      year: 2014,
      duration: 169,
      genre: 'Sci-Fi',
      rating: 8.9,
      accent: '#C3B188',
      overview: 'Explorers travel through a wormhole to find a new home for humanity.',
    },
    {
      id: 'dark-knight',
      title: 'The Dark Knight',
      year: 2008,
      duration: 152,
      genre: 'Action',
      rating: 9.0,
      accent: '#5870D9',
      overview: 'Batman battles the Joker as Gotham spirals into chaos.',
    },
    {
      id: 'spider-man',
      title: 'Spiderman',
      year: 2019,
      duration: 139,
      genre: 'Action',
      rating: 9.5,
      accent: '#F08E42',
      overview: 'Spider-Man balances everyday life and superhero responsibility.',
    },
  ],
};

export const searchMoviesFallback: Movie[] = [
  {
    id: 'spiderman-homecoming',
    title: 'Spiderman',
    year: 2019,
    duration: 139,
    genre: 'Action',
    rating: 9.5,
    accent: '#F28A37',
    overview: 'Spider-Man balances everyday life and superhero responsibility.',
  },
  {
    id: 'spider-man-no-way-home-search',
    title: 'Spider-Man: No Way Home',
    year: 2021,
    duration: 139,
    genre: 'Action',
    rating: 8.5,
    accent: '#D94A48',
    overview:
      'Peter Parker asks Doctor Strange for help after his identity is revealed, but the spell tears open the multiverse.',
  },
];
