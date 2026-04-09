import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

import { colors, spacing } from '../../../theme';

const Container = styled.Pressable`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: ${spacing.lg}px;
`;

const Poster = styled.View<{ $accent: string; $hasImage: boolean }>`
  width: 120px;
  height: 160px;
  border-radius: 24px;
  overflow: hidden;
  justify-content: flex-end;
  padding: ${spacing.sm}px;
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
  background-color: rgba(15, 18, 24, 0.18);
`;

const PosterText = styled.Text`
  color: ${colors.text};
  font-size: 18px;
  font-weight: 700;
`;

const Content = styled.View`
  flex: 1;
  padding-left: ${spacing.lg}px;
  padding-top: ${spacing.sm}px;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-size: 16px;
  line-height: 16px;
  font-weight: 400;
  margin-bottom: ${spacing.md}px;
`;

const MetaRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.xs}px;
  margin-bottom: ${spacing.sm}px;
`;

const RatingText = styled.Text`
  color: #ff8700;
  font-size: 12px;
  line-height: 12px;
  font-weight: 600;
  letter-spacing: 0.12px;
`;

const MetaText = styled.Text`
  color: ${colors.textMuted};
  font-size: 12px;
  line-height: 12px;
  font-weight: 600;
  letter-spacing: 0.12px;
`;

export {
  Container,
  Content,
  MetaRow,
  MetaText,
  Poster,
  PosterImage,
  PosterShade,
  PosterText,
  RatingText,
  Title,
};
