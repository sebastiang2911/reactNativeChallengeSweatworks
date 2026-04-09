import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import CalendarIcon from '../../../assets/icons/calendar.svg';
import ClockIcon from '../../../assets/icons/clock.svg';
import RibbonIcon from '../../../assets/icons/ribbon.svg';
import StarIcon from '../../../assets/icons/star.svg';
import WatchlistSaveIcon from '../../../assets/icons/watchlist-save.svg';
import { BackIcon } from '../../components/Icons';
import { useWatchlist } from '../../context/WatchlistContext';
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
  MetaIconWrap,
  MetaItemText,
  MetaRow,
  MetaSeparator,
  OverlapStage,
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
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

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
            <BackIcon size={20} />
          </BackButton>
          <HeaderTitle>Detail</HeaderTitle>
          <HeaderAction onPress={() => toggleWatchlist(movie)}>
            <WatchlistSaveIcon
              width={20}
              height={26}
              opacity={isInWatchlist(movie.id) ? 1 : 0.6}
            />
          </HeaderAction>
        </Header>

        <Hero>
          <OverlapStage>
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
              <RatingBadge>
                <StarIcon color="#FF8700" width={18} height={18} />
                <RatingText>{movie.rating.toFixed(1)}</RatingText>
              </RatingBadge>
            </Backdrop>
            <PosterThumb style={{ backgroundColor: movie.accent }}>
              {posterUri ? (
                <PosterThumbImage
                  source={{ uri: posterUri }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              ) : null}
            </PosterThumb>

            <DetailCard>
              <TitleRow>
                <Title numberOfLines={2}>{movie.title}</Title>
              </TitleRow>

            </DetailCard>
            <MetaRow>
              {movie.year ? (
                <>
                  <MetaIconWrap>
                    <CalendarIcon color={colors.textMuted} width={16} height={16} />
                    <MetaItemText>{movie.year}</MetaItemText>
                  </MetaIconWrap>
                  <MetaSeparator />
                </>
              ) : null}
              {movie.duration ? (
                <>
                  <MetaIconWrap>
                    <ClockIcon color={colors.textMuted} width={16} height={16} />
                    <MetaItemText>{movie.duration} Minutes</MetaItemText>
                  </MetaIconWrap>
                  <MetaSeparator />
                </>
              ) : null}
              {movie.genre ? (
                <MetaIconWrap>
                  <RibbonIcon color={colors.textMuted} width={16} height={16} />
                  <MetaItemText>{movie.genre}</MetaItemText>
                </MetaIconWrap>
              ) : null}
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
          </OverlapStage>
        </Hero>
      </Scroll>
    </SafeArea>
  );
}

export { DetailScreen };
