import React from 'react';

import CalendarIcon from '../../../assets/icons/calendar.svg';
import ClockIcon from '../../../assets/icons/clock.svg';
import RibbonIcon from '../../../assets/icons/ribbon.svg';
import StarIcon from '../../../assets/icons/star.svg';
import { MetaInfo, MovieArtwork } from '../shared';
import { Movie } from '../../data/movies';
import { getTmdbImageUrl } from '../../services/tmdb';
import { colors } from '../../theme';
import {
  Container,
  Content,
  posterArtworkStyle,
  posterFallbackTitleStyle,
  ratingMetaTextStyle,
  secondaryMetaTextStyle,
  sharedMetaRowStyle,
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
      <MovieArtwork
        accent={movie.accent}
        containerStyle={posterArtworkStyle}
        fallbackTitle={fallbackTitle}
        fallbackTitleStyle={posterFallbackTitleStyle}
        imageErrorContext="MovieListItem"
        imageUri={imageUri}
        shadeOpacity={0.18}
        title={movie.title}
      />

      <Content>
        <Title numberOfLines={1}>{movie.title}</Title>
        <MetaInfo
          icon={<StarIcon color="#FF8700" width={16} height={16} />}
          style={sharedMetaRowStyle}
          text={movie.rating.toFixed(1)}
          textStyle={ratingMetaTextStyle}
        />
        {movie.genre ? (
          <MetaInfo
            icon={<RibbonIcon color={colors.textMuted} width={16} height={16} />}
            style={sharedMetaRowStyle}
            text={movie.genre}
            textStyle={secondaryMetaTextStyle}
          />
        ) : null}
        {movie.year ? (
          <MetaInfo
            icon={<CalendarIcon color={colors.textMuted} width={16} height={16} />}
            style={sharedMetaRowStyle}
            text={movie.year}
            textStyle={secondaryMetaTextStyle}
          />
        ) : null}
        {movie.duration ? (
          <MetaInfo
            icon={<ClockIcon color={colors.textMuted} width={16} height={16} />}
            style={sharedMetaRowStyle}
            text={`${movie.duration} minutes`}
            textStyle={secondaryMetaTextStyle}
          />
        ) : null}
      </Content>
    </Container>
  );
}

export { MovieListItem };
