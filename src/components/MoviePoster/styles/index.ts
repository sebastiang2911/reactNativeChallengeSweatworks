import { TextStyle, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

import { colors } from '../../../theme';

const PosterWrapper = styled.View<{ $isLarge: boolean }>`
  width: ${({ $isLarge }) => ($isLarge ? '214px' : '31%')};
  margin-right: ${({ $isLarge }) => ($isLarge ? '22px' : '0px')};
  margin-bottom: ${({ $isLarge }) => ($isLarge ? '0px' : '18px')};
  position: relative;
`;

function getPosterArtworkStyle(isLarge: boolean): ViewStyle {
  return {
    width: isLarge ? 214 : '100%',
    height: isLarge ? 300 : undefined,
    aspectRatio: isLarge ? undefined : 0.72,
    borderRadius: 24,
    padding: 14,
  };
}

function getPosterTitleStyle(isLarge: boolean): TextStyle {
  return {
    color: colors.text,
    fontSize: isLarge ? 24 : 18,
    lineHeight: isLarge ? 28 : 22,
    fontWeight: '700' as const,
  };
}

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
  PosterWrapper,
  getPosterArtworkStyle,
  getPosterTitleStyle,
  RankLabel,
};
