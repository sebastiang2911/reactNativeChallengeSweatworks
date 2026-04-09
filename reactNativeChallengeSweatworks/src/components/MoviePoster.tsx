import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Movie } from '../data/movies';
import { colors } from '../theme';

type MoviePosterProps = {
  movie: Movie;
  size?: 'large' | 'small';
  rank?: number;
};

function MoviePoster({ movie, size = 'small', rank }: MoviePosterProps) {
  const isLarge = size === 'large';

  return (
    <View style={isLarge ? styles.largeWrapper : styles.smallWrapper}>
      <View
        style={[
          styles.poster,
          isLarge ? styles.posterLarge : styles.posterSmall,
          { backgroundColor: movie.accent },
        ]}
      >
        <View style={styles.posterShade} />
        <Text style={[styles.posterTitle, isLarge && styles.posterTitleLarge]}>
          {movie.title}
        </Text>
      </View>
      {typeof rank === 'number' ? (
        <Text style={styles.rankLabel}>{rank}</Text>
      ) : null}
    </View>
  );
}

export { MoviePoster };

const styles = StyleSheet.create({
  largeWrapper: {
    width: 214,
    marginRight: 22,
  },
  smallWrapper: {
    width: '31%',
    marginBottom: 18,
  },
  poster: {
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 14,
  },
  posterLarge: {
    width: 214,
    height: 300,
  },
  posterSmall: {
    width: '100%',
    aspectRatio: 0.72,
  },
  posterShade: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 18, 24, 0.35)',
  },
  posterTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
  },
  posterTitleLarge: {
    fontSize: 24,
    lineHeight: 28,
  },
  rankLabel: {
    position: 'absolute',
    left: -16,
    bottom: -18,
    color: colors.accentSoft,
    fontSize: 78,
    lineHeight: 82,
    fontWeight: '800',
    textShadowColor: colors.accent,
    textShadowRadius: 1,
  },
});
