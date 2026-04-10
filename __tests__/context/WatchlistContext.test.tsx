import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { movieFixture } from '../fixtures/movie';
import { WatchlistProvider, useWatchlist } from '../../src/context/WatchlistContext';

function Consumer() {
  const { watchlist, isInWatchlist, toggleWatchlist } = useWatchlist();

  return (
    <View>
      <Text testID="watchlist-size">{watchlist.length}</Text>
      <Text testID="contains-movie">{String(isInWatchlist(movieFixture.id))}</Text>
      <Pressable testID="toggle-watchlist" onPress={() => toggleWatchlist(movieFixture)} />
    </View>
  );
}

describe('WatchlistContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('hydrates, toggles and persists watchlist items', async () => {
    jest.mocked(AsyncStorage.getItem).mockResolvedValueOnce(null);

    render(
      <WatchlistProvider>
        <Consumer />
      </WatchlistProvider>,
    );

    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@movie-app/watchlist');
    });

    fireEvent.press(screen.getByTestId('toggle-watchlist'));

    await waitFor(() => {
      expect(screen.getByTestId('watchlist-size')).toHaveTextContent('1');
    });

    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith(
      '@movie-app/watchlist',
      JSON.stringify([movieFixture]),
    );

    fireEvent.press(screen.getByTestId('toggle-watchlist'));

    await waitFor(() => {
      expect(screen.getByTestId('watchlist-size')).toHaveTextContent('0');
    });

    expect(AsyncStorage.setItem).toHaveBeenLastCalledWith('@movie-app/watchlist', '[]');
  });
});
