import React from 'react';
import { View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { movieFixture } from '../fixtures/movie';
import { MoviePoster } from '../../src/components/MoviePoster';

const mockGetTmdbImageUrl = jest.fn();

type MovieArtworkProps = {
  imageUri: string;
  onPress: () => void;
};

const mockMovieArtwork = jest.fn((_: unknown) => <View testID="movie-artwork" />);

jest.mock('../../src/services/tmdb', () => ({
  getTmdbImageUrl: (...args: unknown[]) => mockGetTmdbImageUrl(...args),
}));

jest.mock('../../src/components/shared', () => ({
  MovieArtwork: (props: unknown) => mockMovieArtwork(props),
}));

describe('MoviePoster', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetTmdbImageUrl.mockReturnValue('https://image.tmdb.org/t/p/w500/poster.jpg');
  });

  it('builds the artwork props from the movie and forwards press events', () => {
    const onPress = jest.fn();

    render(<MoviePoster movie={movieFixture} size="large" rank={3} onPress={onPress} />);

    const firstCall = mockMovieArtwork.mock.calls[0];
    expect(firstCall).toBeDefined();
    const artworkProps = firstCall?.[0] as unknown as MovieArtworkProps;

    artworkProps.onPress();

    expect(artworkProps.imageUri).toBe('https://image.tmdb.org/t/p/w500/poster.jpg');
    expect(screen.getByText('3')).toBeOnTheScreen();
    expect(onPress).toHaveBeenCalled();
  });
});
