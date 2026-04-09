import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Movie } from '../data/movies';
import { colors, spacing } from '../theme';

type MovieListItemProps = {
  movie: Movie;
  compactTitle?: boolean;
};

function MovieListItem({ movie, compactTitle = false }: MovieListItemProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.poster, { backgroundColor: movie.accent }]}>
        <View style={styles.posterShade} />
        <Text style={styles.posterText}>
          {compactTitle ? movie.title.slice(0, 9) : movie.title}
        </Text>
      </View>

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {movie.title}
        </Text>
        <Text style={styles.rating}>{movie.rating.toFixed(1)}/10</Text>
        <Text style={styles.meta}>{movie.genre}</Text>
        <Text style={styles.meta}>{movie.year}</Text>
        <Text style={styles.meta}>{movie.duration} minutes</Text>
      </View>
    </View>
  );
}

export { MovieListItem };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  poster: {
    width: 110,
    height: 150,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: spacing.sm,
  },
  posterShade: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 18, 24, 0.3)',
  },
  posterText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingLeft: spacing.md,
    paddingTop: spacing.xs,
    gap: 6,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  rating: {
    color: colors.warning,
    fontSize: 16,
    fontWeight: '700',
  },
  meta: {
    color: colors.text,
    fontSize: 15,
  },
});
