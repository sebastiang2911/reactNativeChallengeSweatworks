import React, { createContext, useContext, useMemo, useState } from 'react';

import { Movie } from '../data/movies';

type WatchlistContextValue = {
  watchlist: Movie[];
  isInWatchlist: (movieId: string) => boolean;
  toggleWatchlist: (movie: Movie) => void;
};

const WatchlistContext = createContext<WatchlistContextValue | undefined>(undefined);

function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const value = useMemo<WatchlistContextValue>(
    () => ({
      watchlist,
      isInWatchlist: (movieId: string) =>
        watchlist.some(watchlistMovie => watchlistMovie.id === movieId),
      toggleWatchlist: (movie: Movie) => {
        setWatchlist(currentWatchlist => {
          const alreadySaved = currentWatchlist.some(
            watchlistMovie => watchlistMovie.id === movie.id,
          );

          if (alreadySaved) {
            return currentWatchlist.filter(watchlistMovie => watchlistMovie.id !== movie.id);
          }

          return [movie, ...currentWatchlist];
        });
      },
    }),
    [watchlist],
  );

  return (
    <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>
  );
}

function useWatchlist() {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }

  return context;
}

export { WatchlistProvider, useWatchlist };
