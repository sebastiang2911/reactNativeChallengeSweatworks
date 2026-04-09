import React from 'react';

import { Movie } from '../../data/movies';
import { getTmdbImageUrl } from '../../services/tmdb';
import {
  PosterImage,
  PosterShade,
  PosterTitle,
  PosterWrapper,
  PressablePoster,
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
      <PressablePoster
        disabled={!onPress}
        onPress={onPress}
        $isLarge={isLarge}
        $accent={movie.accent}
      >
        {imageUri ? (
          <PosterImage
            source={{ uri: imageUri }}
            resizeMode="cover"
            onError={() => {
              console.log('MoviePoster image load error', {
                title: movie.title,
                uri: imageUri,
              });
            }}
          />
        ) : null}
        <PosterShade pointerEvents="none" />
        {!imageUri ? (
          <PosterTitle $isLarge={isLarge}>{movie.title}</PosterTitle>
        ) : null}
      </PressablePoster>
      {typeof rank === 'number' ? <RankLabel>{rank}</RankLabel> : null}
    </PosterWrapper>
  );
}

export { MoviePoster };
