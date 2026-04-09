import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { colors, spacing } from '../../../theme';

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${spacing.xl}px;
  padding-top: ${spacing.md}px;
`;

const HeaderTitle = styled.Text`
  color: ${colors.text};
  font-family: 'Montserrat';
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
`;

const SearchWrapper = styled.View`
  padding-horizontal: ${spacing.xl}px;
  padding-top: ${spacing.xl}px;
`;

const HelperText = styled.Text`
  color: ${colors.textMuted};
  font-size: 13px;
  line-height: 18px;
  padding-horizontal: ${spacing.xl}px;
  padding-top: ${spacing.sm}px;
`;

const LoadingState = styled.View`
  align-items: center;
  gap: ${spacing.sm}px;
  margin-top: ${spacing.xxl}px;
`;

const LoadingText = styled.Text`
  color: ${colors.textMuted};
  font-size: 14px;
`;

const Results = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
})`
  flex: 1;
  margin-top: ${spacing.xl}px;
`;

const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding-horizontal: 48px;
  gap: ${spacing.md}px;
  width: 60%;

`;

const EmptyIconWrap = styled.View`
  width: 128px;
  height: 128px;
  margin-bottom: ${spacing.lg}px;
  align-items: center;
  justify-content: center;
`;

const EmptyTitle = styled.Text`
  color: ${colors.text};
  font-family: 'Montserrat';
  text-align: center;
  font-size: 16px;
  line-height: 26px;
  font-weight: 600;
  letter-spacing: 0.12px;
  text-transform: capitalize;
`;

const EmptyDescription = styled.Text`
  color: ${colors.textMuted};
  font-family: 'Montserrat';
  text-align: center;
  font-size: 12px;
  line-height: 19px;
  font-weight: 500;
  letter-spacing: 0.12px;
`;

export {
  EmptyDescription,
  EmptyIconWrap,
  EmptyState,
  EmptyTitle,
  Header,
  HeaderTitle,
  HelperText,
  LoadingState,
  LoadingText,
  Results,
  SafeArea,
  SearchWrapper,
};
