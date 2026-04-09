import React from 'react';
import { StyleSheet, View } from 'react-native';

type IconProps = {
  active?: boolean;
  size?: number;
  color?: string;
};

function SearchIcon({ active = false, size = 22, color }: IconProps) {
  const tint = color ?? (active ? '#09A4FF' : '#767C87');

  return (
    <View style={[styles.searchWrapper, { width: size, height: size }]}>
      <View
        style={[
          styles.searchCircle,
          {
            width: size * 0.65,
            height: size * 0.65,
            borderColor: tint,
          },
        ]}
      />
      <View
        style={[
          styles.searchHandle,
          {
            backgroundColor: tint,
            width: size * 0.13,
            height: size * 0.36,
            right: size * 0.08,
            bottom: size * 0.05,
          },
        ]}
      />
    </View>
  );
}

function HomeIcon({ active = false, size = 22, color }: IconProps) {
  const tint = color ?? (active ? '#09A4FF' : '#767C87');

  return (
    <View style={[styles.homeWrapper, { width: size, height: size }]}>
      <View
        style={[
          styles.homeRoof,
          {
            borderBottomColor: tint,
            borderLeftWidth: size * 0.35,
            borderRightWidth: size * 0.35,
            borderBottomWidth: size * 0.35,
          },
        ]}
      />
      <View
        style={[
          styles.homeBody,
          {
            width: size * 0.72,
            height: size * 0.48,
            borderColor: tint,
          },
        ]}
      />
    </View>
  );
}

function BookmarkIcon({ active = false, size = 22, color }: IconProps) {
  const tint = color ?? (active ? '#09A4FF' : '#767C87');

  return (
    <View
      style={[
        styles.bookmark,
        {
          width: size * 0.68,
          height: size,
          borderColor: tint,
        },
      ]}
    >
      <View
        style={[
          styles.bookmarkCut,
          {
            borderLeftWidth: size * 0.18,
            borderRightWidth: size * 0.18,
            borderTopWidth: size * 0.18,
            borderTopColor: tint,
          },
        ]}
      />
    </View>
  );
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
  searchWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchCircle: {
    borderWidth: 2,
    borderRadius: 999,
  },
  searchHandle: {
    position: 'absolute',
    transform: [{ rotate: '-45deg' }],
    borderRadius: 999,
  },
  homeWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  homeRoof: {
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  homeBody: {
    marginTop: -1,
    borderWidth: 2,
    borderTopWidth: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  bookmark: {
    borderWidth: 2,
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bookmarkCut: {
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
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
