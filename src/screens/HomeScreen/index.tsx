import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { MoviePoster } from '../../components/MoviePoster';
import { SearchBar } from '../../components/SearchBar';
import {
  categories,
  categoryMoviesFallback,
  featuredMoviesFallback,
  Movie,
} from '../../data/movies';
import {
  RootStackParamList,
  RootTabParamList,
} from '../../navigation/AppNavigator';
import {
  fetchHomeMovies,
  isTmdbConfigured,
  preloadMovieImages,
} from '../../services/tmdb';
import { colors } from '../../theme';
import {
  CategoryButton,
  CategoryIndicator,
  CategoryLabel,
  CategoryRow,
  Content,
  FeaturedRow,
  Grid,
  HelperText,
  LoadingState,
  LoadingText,
  Screen,
  SafeArea,
  Title,
} from './styles';

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

function HomeScreen({ navigation }: Props) {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]>('Now playing');
  const [featuredMovies, setFeaturedMovies] =
    useState<Movie[]>(featuredMoviesFallback);
  const [categoryMovies, setCategoryMovies] = useState(categoryMoviesFallback);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(!isTmdbConfigured());

  const categoryTitles: Record<(typeof categories)[number], string> = {
    'Now playing': 'Now Playing',
    Upcoming: 'Upcoming',
    'Top rated': 'Top Rated',
  };

  useEffect(() => {
    let isMounted = true;

    async function loadMovies() {
      setLoading(true);

      const response = await fetchHomeMovies();

      if (!isMounted) {
        return;
      }

      setFeaturedMovies(response.featuredMovies);
      setCategoryMovies(response.categoryMovies);
      setUsingFallback(response.usingFallback);
      preloadMovieImages(response.featuredMovies, 'w780');
      preloadMovieImages(
        categories.flatMap(category => response.categoryMovies[category]),
        'w500',
      );
      setLoading(false);
    }

    loadMovies().catch(() => {
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SafeArea>
      <Screen showsVerticalScrollIndicator={false}>
        <Content>
          <Title>What do you want to watch?</Title>

          <Pressable onPress={() => navigation.navigate('Search')}>
            <SearchBar placeholder="Search" editable={false} />
          </Pressable>

          {usingFallback ? (
            <HelperText>
              Add your TMDB read access token in `keys.development.json` and rebuild to
              load live data.
            </HelperText>
          ) : null}

          <FeaturedRow horizontal showsHorizontalScrollIndicator={false}>
            {featuredMovies.map((movie, index) => (
              <MoviePoster
                key={movie.id}
                movie={movie}
                size="large"
                rank={index + 1}
                onPress={() => navigation.navigate('Detail', { movie })}
              />
            ))}
          </FeaturedRow>

          {loading ? (
            <LoadingState>
              <ActivityIndicator size="small" color={colors.accent} />
              <LoadingText>Loading movies...</LoadingText>
            </LoadingState>
          ) : (
            <>
              <CategoryRow>
                {categories.map(category => {
                  const active = category === selectedCategory;

                  return (
                    <CategoryButton
                      key={category}
                      onPress={() => setSelectedCategory(category)}
                    >
                      <CategoryLabel $active={active}>{categoryTitles[category]}</CategoryLabel>
                      <CategoryIndicator $active={active} />
                    </CategoryButton>
                  );
                })}
              </CategoryRow>

              <Grid>
                {categoryMovies[selectedCategory].slice(0, 6).map(movie => (
                  <MoviePoster
                    key={movie.id}
                    movie={movie}
                    onPress={() => navigation.navigate('Detail', { movie })}
                  />
                ))}
              </Grid>
            </>
          )}
        </Content>
      </Screen>
    </SafeArea>
  );
}

export { HomeScreen };
