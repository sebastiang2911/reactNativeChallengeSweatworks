import styled from 'styled-components/native';

import { colors, spacing } from '../../../theme';

const Container = styled.View`
  height: 62px;
  border-radius: 22px;
  background-color: ${colors.surfaceMuted};
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${spacing.lg}px;
  gap: ${spacing.sm}px;
`;

const Input = styled.TextInput`
  flex: 1;
  color: ${colors.text};
  font-size: 17px;
`;

export { Container, Input };
