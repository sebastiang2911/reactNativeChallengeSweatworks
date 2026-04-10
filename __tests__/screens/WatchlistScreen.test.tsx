import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { movieFixture } from '../fixtures/movie';
import { RootTabParamList } from '../../src/navigation/AppNavigator';
import { WatchlistScreen } from '../../src/screens/WatchlistScreen';

const mockUseWatchlist = jest.fn();

jest.mock('../../src/context/WatchlistContext', () => ({
  useWatchlist: () => mockUseWatchlist(),
}));

jest.mock('../../src/components/MovieListItem', () => ({
  MovieListItem: (props: Record<string, unknown>) => {
    const React = require('react');
    const { Pressable, Text } = require('react-native');
    return (
      <Pressable testID="movie-list-item" onPress={props.onPress as () => void}>
        <Text>{(props.movie as { title: string }).title}</Text>
      </Pressable>
    );
  },
}));

describe('WatchlistScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders saved movies and navigates to detail', () => {
    const navigate = jest.fn();
    mockUseWatchlist.mockReturnValue({ watchlist: [movieFixture] });
    const route = {
      key: 'watchlist-test',
      name: 'Watch list' as keyof RootTabParamList,
      params: undefined,
    } as never;

    render(<WatchlistScreen navigation={{ navigate } as never} route={route} />);

    fireEvent.press(screen.getByTestId('movie-list-item'));

    expect(screen.getByText('The Matrix')).toBeOnTheScreen();
    expect(navigate).toHaveBeenCalledWith('Detail', { movie: movieFixture });
  });
});
