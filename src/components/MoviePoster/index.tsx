import React from 'react';

import { MovieArtwork } from '../shared';
import { Movie } from '../../data/movies';
import { getTmdbImageUrl } from '../../services/tmdb';
import {
  PosterWrapper,
  getPosterArtworkStyle,
  getPosterTitleStyle,
  RankLabel,
} from './styles';

type MoviePosterProps = {
  movie: Movie;
  size?: 'large' | 'small';
  rank?: number;
  onPress?: () => void;
};

function MoviePoster({ movie, size = 'small', rank, onPress }: MoviePosterProps) {
  const isLarge = size === 'large';
  const imageUri = getTmdbImageUrl(movie.posterPath, isLarge ? 'w780' : 'w500');

  return (
    <PosterWrapper $isLarge={isLarge}>
      <MovieArtwork
        accent={movie.accent}
        containerStyle={getPosterArtworkStyle(isLarge)}
        fallbackTitle={movie.title}
        fallbackTitleStyle={getPosterTitleStyle(isLarge)}
        imageErrorContext="MoviePoster"
        imageUri={imageUri}
        onPress={onPress}
        shadeOpacity={0.14}
        title={movie.title}
      />
      {typeof rank === 'number' ? <RankLabel>{rank}</RankLabel> : null}
    </PosterWrapper>
  );
}

export { MoviePoster };
