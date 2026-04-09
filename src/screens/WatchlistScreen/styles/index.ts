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
  font-family: 'Montserrat';
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
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
  align-self: center;
  padding-bottom: 88px;
  width: 60%;
`;

const IconWrapper = styled.View`
  margin-bottom: ${spacing.lg}px;
`;

const Subtitle = styled.Text`
  color: ${colors.text};
  font-family: 'Montserrat';
  font-size: 16px;
  line-height: 26px;
  font-weight: 600;
  letter-spacing: 0.12px;
  text-align: center;
  text-transform: capitalize;
  margin-bottom: ${spacing.md}px;
`;

const Description = styled.Text`
  color: ${colors.textMuted};
  font-family: 'Montserrat';
  font-size: 12px;
  line-height: 19px;
  font-weight: 500;
  letter-spacing: 0.12px;
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
