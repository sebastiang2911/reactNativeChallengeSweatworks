import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { colors, spacing } from '../../../theme';

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const Screen = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
})`
  flex: 1;
  background-color: ${colors.background};
`;

const Content = styled.View``;

const Title = styled.Text`
  color: ${colors.text};
  font-size: 18px;
  line-height: 42px;
  font-weight: 800;
  margin-bottom: ${spacing.lg}px;
  max-width: 290px;
`;

const FeaturedRow = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
})``;

const HelperText = styled.Text`
  color: ${colors.textMuted};
  font-size: 13px;
  line-height: 18px;
  margin-top: ${spacing.md}px;
`;

const LoadingState = styled.View`
  align-items: center;
  gap: ${spacing.sm}px;
  padding-top: ${spacing.xl}px;
`;

const LoadingText = styled.Text`
  color: ${colors.textMuted};
  font-size: 14px;
`;

const CategoryRow = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: ${spacing.xl}px;
  margin-top: ${spacing.sm}px;
  margin-bottom: ${spacing.lg}px;
`;

const CategoryButton = styled.Pressable`
  gap: ${spacing.xs}px;
`;

const CategoryLabel = styled.Text<{ $active: boolean }>`
  color: ${({ $active }) => ($active ? colors.text : colors.textMuted)};
  font-size: 17px;
  font-weight: 600;
`;

const CategoryIndicator = styled.View<{ $active: boolean }>`
  height: 4px;
  border-radius: 999px;
  background-color: ${({ $active }) =>
    $active ? colors.surfaceBorder : 'transparent'};
`;

const Grid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export {
  CategoryButton,
  CategoryIndicator,
  CategoryLabel,
  CategoryRow,
  Content,
  FeaturedRow,
  Grid,
  HelperText,
  LoadingState,
  LoadingText,
  Screen,
  SafeArea,
  Title,
};
