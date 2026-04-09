import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';

import {
  ArtworkFallbackTitle,
  ArtworkFrame,
  ArtworkImage,
  ArtworkShade,
} from './styles';

type MovieArtworkProps = {
  accent: string;
  children?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  fallbackTitle?: string;
  fallbackTitleStyle?: StyleProp<TextStyle>;
  imageErrorContext: string;
  imageUri?: string | null;
  onPress?: () => void;
  resizeMode?: FastImageProps['resizeMode'];
  shadeOpacity?: number;
  title: string;
};

function MovieArtwork({
  accent,
  children,
  containerStyle,
  fallbackTitle,
  fallbackTitleStyle,
  imageErrorContext,
  imageUri,
  onPress,
  resizeMode = FastImage.resizeMode.cover,
  shadeOpacity = 0.18,
  title,
}: MovieArtworkProps) {
  const hasImage = Boolean(imageUri);

  return (
    <ArtworkFrame
      disabled={!onPress}
      onPress={onPress}
      style={containerStyle}
      $accent={accent}
      $hasImage={hasImage}
      $shadeOpacity={shadeOpacity}
    >
      {hasImage ? (
        <ArtworkImage
          source={{ uri: imageUri ?? undefined }}
          resizeMode={resizeMode}
          onError={() => {
            console.log(`${imageErrorContext} image load error`, {
              title,
              uri: imageUri,
            });
          }}
        />
      ) : null}

      <ArtworkShade pointerEvents="none" $shadeOpacity={shadeOpacity} />

      {!hasImage && fallbackTitle ? (
        <ArtworkFallbackTitle style={fallbackTitleStyle}>{fallbackTitle}</ArtworkFallbackTitle>
      ) : null}

      {children}
    </ArtworkFrame>
  );
}

export { MovieArtwork };
