import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { colors, spacing } from '../../../theme';

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const Content = styled.View`
  flex: 1;
  padding: ${spacing.xl}px;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-size: 30px;
  font-weight: 800;
  margin-top: ${spacing.md}px;
  text-align: center;
`;

const Results = styled.ScrollView`
  flex: 1;
  margin-top: ${spacing.xl}px;
`;

const EmptyState = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-bottom: 88px;
`;

const IconWrapper = styled.View`
  margin-bottom: ${spacing.lg}px;
`;

const Subtitle = styled.Text`
  color: ${colors.text};
  font-size: 32px;
  font-weight: 800;
  text-align: center;
  margin-bottom: ${spacing.md}px;
`;

const Description = styled.Text`
  color: ${colors.textMuted};
  font-size: 16px;
  line-height: 28px;
  text-align: center;
`;

export {
  Content,
  Description,
  EmptyState,
  IconWrapper,
  Results,
  SafeArea,
  Subtitle,
  Title,
};
