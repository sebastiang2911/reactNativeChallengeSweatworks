import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

import { colors } from '../../../theme';

const ArtworkFrame = styled.Pressable<{
  $accent: string;
  $hasImage: boolean;
  $shadeOpacity: number;
}>`
  overflow: hidden;
  position: relative;
  justify-content: flex-end;
  background-color: ${({ $accent, $hasImage }) =>
    $hasImage ? $accent : colors.surfaceMuted};
`;

const ArtworkImage = styled(FastImage)`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

const ArtworkShade = styled.View<{ $shadeOpacity: number }>`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: rgba(15, 18, 24, ${({ $shadeOpacity }) => $shadeOpacity});
`;

const ArtworkFallbackTitle = styled.Text``;

export { ArtworkFallbackTitle, ArtworkFrame, ArtworkImage, ArtworkShade };
