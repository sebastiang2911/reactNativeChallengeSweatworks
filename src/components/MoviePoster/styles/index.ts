import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

import { colors } from '../../../theme';

const PosterWrapper = styled.View<{ $isLarge: boolean }>`
  width: ${({ $isLarge }) => ($isLarge ? '214px' : '31%')};
  margin-right: ${({ $isLarge }) => ($isLarge ? '22px' : '0px')};
  margin-bottom: ${({ $isLarge }) => ($isLarge ? '0px' : '18px')};
  position: relative;
`;

const PressablePoster = styled.Pressable<{
  $isLarge: boolean;
  $accent: string;
  $hasImage: boolean;
}>`
  width: ${({ $isLarge }) => ($isLarge ? '214px' : '100%')};
  ${({ $isLarge }) =>
    $isLarge
      ? `
    height: 300px;
  `
      : `
    aspect-ratio: 0.72;
  `}
  border-radius: 24px;
  overflow: hidden;
  justify-content: flex-end;
  padding: 14px;
  position: relative;
  background-color: ${({ $accent, $hasImage }) =>
    $hasImage ? $accent : colors.surfaceMuted};
`;

const PosterImage = styled(FastImage)`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

const PosterShade = styled.View`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: rgba(15, 18, 24, 0.14);
`;

const PosterTitle = styled.Text<{ $isLarge: boolean }>`
  color: ${colors.text};
  font-size: ${({ $isLarge }) => ($isLarge ? '24px' : '18px')};
  line-height: ${({ $isLarge }) => ($isLarge ? '28px' : '22px')};
  font-weight: 700;
`;

const RankLabel = styled.Text`
  position: absolute;
  left: -18px;
  bottom: -18px;
  z-index: 2;
  color: #242a32;
  font-family: 'Montserrat';
  font-size: 96px;
  line-height: 117px;
  font-weight: 700;
  text-shadow-color: ${colors.tabBarBorder};
  text-shadow-offset: 1px 1px;
  text-shadow-radius: 4px;
`;

export {
  PosterImage,
  PosterShade,
  PosterTitle,
  PosterWrapper,
  PressablePoster,
  RankLabel,
};
