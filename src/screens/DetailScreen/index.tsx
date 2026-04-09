import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { BackIcon, BookmarkIcon } from '../../components/Icons';
import { Movie } from '../../data/movies';
import { RootStackParamList } from '../../navigation/AppNavigator';
import {
  fetchMovieDetail,
  getTmdbImageUrl,
  preloadMovieImages,
} from '../../services/tmdb';
import { colors } from '../../theme';
import {
  BackButton,
  Backdrop,
  BackdropImage,
  Body,
  DetailCard,
  Header,
  HeaderAction,
  HeaderTitle,
  Hero,
  LoadingWrap,
  MetaItem,
  MetaRow,
  PlayButton,
  PlayTriangle,
  PosterThumb,
  PosterThumbImage,
  RatingBadge,
  RatingText,
  SafeArea,
  Scroll,
  Summary,
  Title,
  TitleRow,
} from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

function DetailScreen({ navigation, route }: Props) {
  const [movie, setMovie] = useState<Movie>(route.params.movie);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    preloadMovieImages([route.params.movie], 'w780');

    async function loadDetail() {
      setLoading(true);
      const response = await fetchMovieDetail(route.params.movie.id, route.params.movie);

      if (!isMounted || !response) {
        setLoading(false);
        return;
      }

      setMovie(response);
      preloadMovieImages([response], 'w780');
      setLoading(false);
    }

    loadDetail().catch(() => {
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [route.params.movie]);

  const backdropUri = getTmdbImageUrl(movie.backdropPath, 'w780');
  const posterUri = getTmdbImageUrl(movie.posterPath, 'w500');

  return (
    <SafeArea>
      <Scroll showsVerticalScrollIndicator={false}>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <BackIcon />
          </BackButton>
          <HeaderTitle>Detail</HeaderTitle>
          <HeaderAction>
            <BookmarkIcon color={colors.text} />
          </HeaderAction>
        </Header>

        <Hero>
          <Backdrop style={{ backgroundColor: movie.accent }}>
            {backdropUri ? (
              <BackdropImage
                source={{ uri: backdropUri }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : null}
            <PlayButton>
              <PlayTriangle />
            </PlayButton>
          </Backdrop>
        </Hero>

        <DetailCard>
          <PosterThumb style={{ backgroundColor: movie.accent }}>
            {posterUri ? (
              <PosterThumbImage
                source={{ uri: posterUri }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : null}
          </PosterThumb>

          <TitleRow>
            <Title>{movie.title}</Title>
            <RatingBadge>
              <RatingText>{movie.rating.toFixed(1)}</RatingText>
            </RatingBadge>
          </TitleRow>

          <MetaRow>
            {movie.year ? <MetaItem>{movie.year}</MetaItem> : null}
            {movie.duration ? <MetaItem>{movie.duration} Minutes</MetaItem> : null}
            {movie.genre ? <MetaItem>{movie.genre}</MetaItem> : null}
          </MetaRow>

          {loading ? (
            <LoadingWrap>
              <ActivityIndicator size="small" color={colors.accent} />
            </LoadingWrap>
          ) : null}

          <Body>
            <Summary>
              {movie.overview ??
                'No synopsis is available for this movie yet.'}
            </Summary>
          </Body>
        </DetailCard>
      </Scroll>
    </SafeArea>
  );
}

export { DetailScreen };
