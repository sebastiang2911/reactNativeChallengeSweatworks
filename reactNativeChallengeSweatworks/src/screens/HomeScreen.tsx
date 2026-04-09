import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { SearchBar } from '../components/SearchBar';
import { MoviePoster } from '../components/MoviePoster';
import { categories, categoryMovies, featuredMovies } from '../data/movies';
import { RootTabParamList } from '../navigation/AppNavigator';
import { colors, spacing } from '../theme';

type Props = BottomTabScreenProps<RootTabParamList, 'Home'>;

function HomeScreen({ navigation }: Props) {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]>('Now playing');

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>What do you want to watch?</Text>

      <Pressable onPress={() => navigation.navigate('Search')}>
        <SearchBar placeholder="Search" editable={false} />
      </Pressable>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuredRow}
      >
        {featuredMovies.map((movie, index) => (
          <MoviePoster key={movie.id} movie={movie} size="large" rank={index + 1} />
        ))}
      </ScrollView>

      <View style={styles.tabRow}>
        {categories.map(category => {
          const active = category === selectedCategory;

          return (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={styles.categoryButton}
            >
              <Text style={[styles.categoryText, active && styles.categoryTextActive]}>
                {category}
              </Text>
              <View style={[styles.indicator, active && styles.indicatorActive]} />
            </Pressable>
          );
        })}
      </View>

      <View style={styles.grid}>
        {categoryMovies[selectedCategory].map(movie => (
          <MoviePoster key={movie.id} movie={movie} />
        ))}
      </View>
    </ScrollView>
  );
}

export { HomeScreen };

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  title: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '800',
    marginBottom: spacing.lg,
    maxWidth: 290,
  },
  featuredRow: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  categoryButton: {
    gap: spacing.xs,
  },
  categoryText: {
    color: colors.textMuted,
    fontSize: 17,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: colors.text,
  },
  indicator: {
    height: 4,
    borderRadius: 999,
    backgroundColor: 'transparent',
  },
  indicatorActive: {
    backgroundColor: colors.surfaceBorder,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
