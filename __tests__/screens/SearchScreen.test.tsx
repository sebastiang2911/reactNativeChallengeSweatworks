import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { movieFixture } from '../fixtures/movie';
import { RootTabParamList } from '../../src/navigation/AppNavigator';
import { SearchScreen } from '../../src/screens/SearchScreen';

const mockIsTmdbConfigured = jest.fn();
const mockSearchTmdbMovies = jest.fn();
const mockPreloadMovieImages = jest.fn();

jest.mock('../../src/services/tmdb', () => ({
  isTmdbConfigured: () => mockIsTmdbConfigured(),
  searchTmdbMovies: (...args: unknown[]) => mockSearchTmdbMovies(...args),
  preloadMovieImages: (...args: unknown[]) => mockPreloadMovieImages(...args),
}));

jest.mock('../../src/components/SearchBar', () => ({
  SearchBar: (props: Record<string, unknown>) => {
    const React = require('react');
    const { TextInput } = require('react-native');
    return <TextInput testID="search-input" {...props} />;
  },
}));

jest.mock('../../src/components/MovieListItem', () => ({
  MovieListItem: () => {
    const React = require('react');
    const { Text } = require('react-native');
    return <Text testID="movie-list-item">movie item</Text>;
  },
}));

jest.mock('../../src/components/Icons', () => ({
  BackIcon: () => null,
  InfoIcon: () => null,
}));

describe('SearchScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    mockIsTmdbConfigured.mockReturnValue(true);
    mockSearchTmdbMovies.mockResolvedValue({
      results: [movieFixture],
      usingFallback: false,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('searches after debounce and renders the returned results', async () => {
    const navigation = {
      navigate: jest.fn(),
    } as never;
    const route = {
      key: 'search-test',
      name: 'Search' as keyof RootTabParamList,
      params: undefined,
    } as never;

    render(<SearchScreen navigation={navigation} route={route} />);

    mockSearchTmdbMovies.mockClear();
    fireEvent.changeText(screen.getByTestId('search-input'), 'matrix');
    await act(async () => {
      jest.advanceTimersByTime(350);
    });

    await waitFor(() => {
      expect(mockSearchTmdbMovies).toHaveBeenCalledWith('matrix');
    });

    expect(mockPreloadMovieImages).toHaveBeenCalledWith([movieFixture], 'w342');
    expect(screen.getByTestId('movie-list-item')).toBeOnTheScreen();
  });
});
