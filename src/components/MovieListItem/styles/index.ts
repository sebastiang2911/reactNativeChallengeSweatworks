import { TextStyle, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

import { colors, spacing } from '../../../theme';

const Container = styled.Pressable`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: ${spacing.lg}px;
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

const posterArtworkStyle: ViewStyle = {
  width: 120,
  height: 160,
  borderRadius: 24,
  padding: spacing.sm,
};

const posterFallbackTitleStyle: TextStyle = {
  color: colors.text,
  fontSize: 18,
  fontWeight: '700' as const,
};

const sharedMetaRowStyle: ViewStyle = {
  gap: spacing.xs,
  marginBottom: spacing.sm,
};

const ratingMetaTextStyle: TextStyle = {
  color: '#ff8700',
  fontSize: 12,
  lineHeight: 12,
  fontWeight: '600' as const,
  letterSpacing: 0.12,
};

const secondaryMetaTextStyle: TextStyle = {
  color: colors.textMuted,
  fontSize: 12,
  lineHeight: 12,
  fontWeight: '600' as const,
  letterSpacing: 0.12,
};

export {
  Container,
  Content,
  posterArtworkStyle,
  posterFallbackTitleStyle,
  ratingMetaTextStyle,
  secondaryMetaTextStyle,
  sharedMetaRowStyle,
  Title,
};
