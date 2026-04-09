import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { colors, spacing } from '../../../theme';

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${spacing.xl}px;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-size: 30px;
  font-weight: 800;
  margin-bottom: ${spacing.sm}px;
`;

const Description = styled.Text`
  color: ${colors.textMuted};
  font-size: 16px;
  text-align: center;
`;

export { Content, Description, SafeArea, Title };
