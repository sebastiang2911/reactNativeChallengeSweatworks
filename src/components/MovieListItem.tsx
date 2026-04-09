import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { Movie } from '../data/movies';
import { getTmdbImageUrl } from '../services/tmdb';
import { colors, spacing } from '../theme';

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

  return (
    <Pressable disabled={!onPress} onPress={onPress} style={styles.container}>
      <View style={[styles.poster, { backgroundColor: movie.accent }]}>
        {imageUri ? (
          <FastImage
            source={{ uri: imageUri }}
            style={StyleSheet.absoluteFill}
            resizeMode={FastImage.resizeMode.cover}
            onError={() => {
              console.log('MovieListItem image load error', {
                title: movie.title,
                uri: imageUri,
              });
            }}
          />
        ) : (
          <>
            <View style={styles.posterShade} />
            <Text style={styles.posterText}>
              {compactTitle ? movie.title.slice(0, 9) : movie.title}
            </Text>
          </>
        )}
        <View pointerEvents="none" style={styles.posterShade} />
        {!imageUri ? (
          <Text style={styles.posterText}>
            {compactTitle ? movie.title.slice(0, 9) : movie.title}
          </Text>
        ) : null}
      </View>

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {movie.title}
        </Text>
        <Text style={styles.rating}>{movie.rating.toFixed(1)}/10</Text>
        {movie.genre ? <Text style={styles.meta}>{movie.genre}</Text> : null}
        {movie.year ? <Text style={styles.meta}>{movie.year}</Text> : null}
        {movie.duration ? (
          <Text style={styles.meta}>{movie.duration} minutes</Text>
        ) : null}
      </View>
    </Pressable>
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
    position: 'relative',
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
