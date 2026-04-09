import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { Movie } from '../data/movies';

type WatchlistContextValue = {
  watchlist: Movie[];
  isInWatchlist: (movieId: string) => boolean;
  toggleWatchlist: (movie: Movie) => void;
};

const WatchlistContext = createContext<WatchlistContextValue | undefined>(undefined);
const WATCHLIST_STORAGE_KEY = '@movie-app/watchlist';

function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadWatchlist() {
      try {
        const storedWatchlist = await AsyncStorage.getItem(WATCHLIST_STORAGE_KEY);

        if (storedWatchlist && isMounted) {
          setWatchlist(JSON.parse(storedWatchlist) as Movie[]);
        }
      } catch (error) {
        console.warn('Failed to load watchlist from local storage.', error);
      } finally {
        if (isMounted) {
          setIsHydrated(true);
        }
      }
    }

    loadWatchlist();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    async function persistWatchlist() {
      try {
        await AsyncStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlist));
      } catch (error) {
        console.warn('Failed to persist watchlist to local storage.', error);
      }
    }

    persistWatchlist();
  }, [isHydrated, watchlist]);

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

  if (!isHydrated) {
    return null;
  }

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
