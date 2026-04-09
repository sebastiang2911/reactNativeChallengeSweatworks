import React from 'react';

import CalendarIcon from '../../../assets/icons/calendar.svg';
import ClockIcon from '../../../assets/icons/clock.svg';
import RibbonIcon from '../../../assets/icons/ribbon.svg';
import StarIcon from '../../../assets/icons/star.svg';
import { Movie } from '../../data/movies';
import { getTmdbImageUrl } from '../../services/tmdb';
import { colors } from '../../theme';
import {
  Container,
  Content,
  MetaRow,
  MetaText,
  Poster,
  PosterImage,
  PosterShade,
  PosterText,
  RatingText,
  Title,
} from './styles';

type MovieListItemProps = {
  movie: Movie;
  compactTitle?: boolean;
  onPress?: () => void;
};

function MovieListItem({
  movie,
  compactTitle = false,
  onPress,
}: MovieListItemProps) {
  const imageUri = getTmdbImageUrl(movie.posterPath, 'w342');
  const fallbackTitle = compactTitle ? movie.title.slice(0, 9) : movie.title;

  return (
    <Container disabled={!onPress} onPress={onPress}>
      <Poster $accent={movie.accent}>
        {imageUri ? (
          <PosterImage
            source={{ uri: imageUri }}
            resizeMode="cover"
            onError={() => {
              console.log('MovieListItem image load error', {
                title: movie.title,
                uri: imageUri,
              });
            }}
          />
        ) : (
          <>
            <PosterShade />
            <PosterText>{fallbackTitle}</PosterText>
          </>
        )}
        <PosterShade pointerEvents="none" />
        {!imageUri ? <PosterText>{fallbackTitle}</PosterText> : null}
      </Poster>

      <Content>
        <Title numberOfLines={1}>{movie.title}</Title>
        <MetaRow>
          <StarIcon color="#FF8700" width={16} height={16} />
          <RatingText>{movie.rating.toFixed(1)}</RatingText>
        </MetaRow>
        {movie.genre ? (
          <MetaRow>
            <RibbonIcon color={colors.textMuted} width={16} height={16} />
            <MetaText>{movie.genre}</MetaText>
          </MetaRow>
        ) : null}
        {movie.year ? (
          <MetaRow>
            <CalendarIcon color={colors.textMuted} width={16} height={16} />
            <MetaText>{movie.year}</MetaText>
          </MetaRow>
        ) : null}
        {movie.duration ? (
          <MetaRow>
            <ClockIcon color={colors.textMuted} width={16} height={16} />
            <MetaText>{movie.duration} minutes</MetaText>
          </MetaRow>
        ) : null}
      </Content>
    </Container>
  );
}

export { MovieListItem };
