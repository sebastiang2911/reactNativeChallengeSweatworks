import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';

import { categoryMoviesFallback, featuredMoviesFallback } from '../../src/data/movies';
import { RootTabParamList } from '../../src/navigation/AppNavigator';
import { HomeScreen } from '../../src/screens/HomeScreen';

const mockFetchHomeMovies = jest.fn();
const mockIsTmdbConfigured = jest.fn();
const mockPreloadMovieImages = jest.fn();

jest.mock('../../src/services/tmdb', () => ({
  fetchHomeMovies: () => mockFetchHomeMovies(),
  isTmdbConfigured: () => mockIsTmdbConfigured(),
  preloadMovieImages: (...args: unknown[]) => mockPreloadMovieImages(...args),
}));

jest.mock('../../src/components/SearchBar', () => ({
  SearchBar: () => {
    const React = require('react');
    const { View } = require('react-native');
    return <View testID="search-bar" />;
  },
}));

jest.mock('../../src/components/MoviePoster', () => ({
  MoviePoster: () => {
    const React = require('react');
    const { Text } = require('react-native');
    return <Text testID="movie-poster">poster</Text>;
  },
}));

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsTmdbConfigured.mockReturnValue(false);
    mockFetchHomeMovies.mockResolvedValue({
      featuredMovies: featuredMoviesFallback,
      categoryMovies: categoryMoviesFallback,
      usingFallback: true,
    });
  });

  it('loads fallback content and shows the helper message when TMDB is unavailable', async () => {
    const navigation = {
      navigate: jest.fn(),
    } as never;
    const route = {
      key: 'home-test',
      name: 'Home' as keyof RootTabParamList,
      params: undefined,
    } as never;

    render(<HomeScreen navigation={navigation} route={route} />);

    await waitFor(() => {
      expect(mockFetchHomeMovies).toHaveBeenCalled();
    });

    expect(mockPreloadMovieImages).toHaveBeenCalledTimes(2);
    expect(screen.getAllByTestId('movie-poster').length).toBeGreaterThan(0);
    expect(screen.getByText(/keys\.development\.json/i)).toBeOnTheScreen();
  });
});
