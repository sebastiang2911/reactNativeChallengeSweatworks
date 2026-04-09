import React from 'react';
import { StyleSheet, View } from 'react-native';

import HomeSvg from '../../assets/icons/home.svg';
import SearchSvg from '../../assets/icons/search.svg';
import WatchlistSvg from '../../assets/icons/watchlist.svg';

type IconProps = {
  active?: boolean;
  size?: number;
  color?: string;
};

function SearchIcon({ active = false, size = 22, color }: IconProps) {
  const tint = color ?? (active ? '#09A4FF' : '#767C87');

  return <SearchSvg width={size} height={size} color={tint} />;
}

function HomeIcon({ active = false, size = 22, color }: IconProps) {
  const tint = color ?? (active ? '#09A4FF' : '#767C87');

  return <HomeSvg width={size} height={size} color={tint} />;
}

function BookmarkIcon({ active = false, size = 22, color }: IconProps) {
  const tint = color ?? (active ? '#09A4FF' : '#767C87');

  return <WatchlistSvg width={size} height={size} color={tint} />;
}

function BackIcon({
  color = '#F3F5F7',
  size = 18,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <View style={[styles.backWrapper, { width: size, height: size }]}>
      <View
        style={[
          styles.backTop,
          {
            backgroundColor: color,
            width: size * 0.14,
            height: size * 0.62,
            left: size * 0.2,
            top: size * 0.06,
          },
        ]}
      />
      <View
        style={[
          styles.backBottom,
          {
            backgroundColor: color,
            width: size * 0.14,
            height: size * 0.62,
            left: size * 0.2,
            top: size * 0.32,
          },
        ]}
      />
    </View>
  );
}

function InfoIcon({
  color = '#F3F5F7',
  size = 22,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <View
      style={[
        styles.infoCircle,
        {
          width: size,
          height: size,
          borderColor: color,
        },
      ]}
    >
      <View
        style={[
          styles.infoDot,
          {
            width: size * 0.14,
            height: size * 0.14,
            backgroundColor: color,
            top: size * 0.18,
          },
        ]}
      />
      <View
        style={[
          styles.infoLine,
          {
            width: size * 0.14,
            height: size * 0.34,
            backgroundColor: color,
            top: size * 0.38,
          },
        ]}
      />
    </View>
  );
}

export { BackIcon, BookmarkIcon, HomeIcon, InfoIcon, SearchIcon };

const styles = StyleSheet.create({
  backWrapper: {
    justifyContent: 'center',
  },
  backTop: {
    position: 'absolute',
    transform: [{ rotate: '45deg' }],
    borderRadius: 999,
  },
  backBottom: {
    position: 'absolute',
    transform: [{ rotate: '-45deg' }],
    borderRadius: 999,
  },
  infoCircle: {
    borderWidth: 2,
    borderRadius: 999,
    alignItems: 'center',
  },
  infoDot: {
    position: 'absolute',
    borderRadius: 999,
  },
  infoLine: {
    position: 'absolute',
    borderRadius: 999,
  },
});
