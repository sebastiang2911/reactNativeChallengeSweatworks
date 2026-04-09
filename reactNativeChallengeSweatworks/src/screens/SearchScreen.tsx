import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackIcon, InfoIcon } from '../components/Icons';
import { MovieListItem } from '../components/MovieListItem';
import { SearchBar } from '../components/SearchBar';
import { searchMovies } from '../data/movies';
import { colors, spacing } from '../theme';

function SearchScreen() {
  const [query, setQuery] = useState('Spiderman');

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return searchMovies.filter(movie =>
      movie.title.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  const hasResults = results.length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <BackIcon />
        <Text style={styles.headerTitle}>Search</Text>
        <InfoIcon />
      </View>

      <View style={styles.searchWrapper}>
        <SearchBar value={query} onChangeText={setQuery} />
      </View>

      {hasResults ? (
        <ScrollView
          style={styles.results}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.resultsContent}
        >
          {results.map(movie => (
            <MovieListItem
              key={movie.id}
              movie={movie}
              compactTitle={movie.title.includes('Spider-Man')}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <View style={styles.emptyIllustration}>
            <View style={styles.emptyCircle} />
            <View style={styles.emptyHandle} />
            <View style={styles.emptyDot} />
            <View style={[styles.emptyDot, styles.emptyDotMiddle]} />
            <View style={[styles.emptyDot, styles.emptyDotRight]} />
          </View>
          <Text style={styles.emptyTitle}>We Are Sorry, We Can Not Find The Movie :(</Text>
          <Text style={styles.emptyDescription}>
            Find your movie by Type title, categories, years, etc
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export { SearchScreen };

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
  },
  searchWrapper: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  results: {
    flex: 1,
    marginTop: spacing.xl,
  },
  resultsContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 48,
    gap: spacing.md,
  },
  emptyIllustration: {
    width: 128,
    height: 128,
    marginBottom: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 6,
    borderColor: '#F29D20',
    backgroundColor: '#F4F6F8',
  },
  emptyHandle: {
    position: 'absolute',
    width: 14,
    height: 60,
    borderRadius: 999,
    backgroundColor: '#F29D20',
    right: 20,
    bottom: 4,
    transform: [{ rotate: '45deg' }],
  },
  emptyDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.background,
    top: 54,
    left: 46,
  },
  emptyDotMiddle: {
    left: 60,
  },
  emptyDotRight: {
    left: 74,
  },
  emptyTitle: {
    color: colors.text,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '800',
  },
  emptyDescription: {
    color: colors.textMuted,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 24,
  },
});
