import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import SearchIconSvg from '../../../assets/icons/searchIcon.svg';
import { BackIcon, InfoIcon } from '../../components/Icons';
import { MovieListItem } from '../../components/MovieListItem';
import { SearchBar } from '../../components/SearchBar';
import { Movie } from '../../data/movies';
import {
  RootStackParamList,
  RootTabParamList,
} from '../../navigation/AppNavigator';
import {
  isTmdbConfigured,
  preloadMovieImages,
  searchTmdbMovies,
} from '../../services/tmdb';
import { colors } from '../../theme';
import {
  EmptyDescription,
  EmptyIconWrap,
  EmptyState,
  EmptyTitle,
  Header,
  HeaderTitle,
  HelperText,
  LoadingState,
  LoadingText,
  Results,
  SafeArea,
  SearchWrapper,
} from './styles';

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Search'>,
  NativeStackScreenProps<RootStackParamList>
>;

function SearchScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(!isTmdbConfigured());

  useEffect(() => {
    let isMounted = true;

    const timeoutId = setTimeout(async () => {
      setLoading(true);

      const response = await searchTmdbMovies(query);

      if (!isMounted) {
        return;
      }

      setResults(response.results);
      setUsingFallback(response.usingFallback);
      preloadMovieImages(response.results, 'w342');
      setLoading(false);
    }, 350);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [query]);

  const hasResults = results.length > 0;

  return (
    <SafeArea>
      <Header>
        <BackIcon />
        <HeaderTitle>Search</HeaderTitle>
        <InfoIcon />
      </Header>

      <SearchWrapper>
        <SearchBar value={query} onChangeText={setQuery} />
      </SearchWrapper>

      {usingFallback ? (
        <HelperText>
          Search uses TMDB when you add the read access token in `src/services/tmdb.ts`.
        </HelperText>
      ) : null}

      {loading ? (
        <LoadingState>
          <ActivityIndicator size="small" color={colors.accent} />
          <LoadingText>Searching movies...</LoadingText>
        </LoadingState>
      ) : hasResults ? (
        <Results showsVerticalScrollIndicator={false}>
          {results.map(movie => (
            <MovieListItem
              key={movie.id}
              movie={movie}
              onPress={() => navigation.navigate('Detail', { movie })}
            />
          ))}
        </Results>
      ) : (
        <EmptyState>
          <EmptyIconWrap>
            <SearchIconSvg width={76} height={76} />
          </EmptyIconWrap>
          <EmptyTitle>{'We Are Sorry, We Can Not Find The Movie :('}</EmptyTitle>
          <EmptyDescription>
            Find your movie by Type title, categories, years, etc
          </EmptyDescription>
        </EmptyState>
      )}
    </SafeArea>
  );
}

export { SearchScreen };
