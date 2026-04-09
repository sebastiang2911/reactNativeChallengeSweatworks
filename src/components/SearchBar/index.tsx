import React from 'react';

import { colors } from '../../theme';
import { SearchIcon } from '../Icons';
import { Container, Input } from './styles';

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  onFocus?: () => void;
};

function SearchBar({
  placeholder = 'Search',
  value,
  onChangeText,
  editable = true,
  onFocus,
}: SearchBarProps) {
  return (
    <Container>
      <Input
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        onFocus={onFocus}
      />
      <SearchIcon size={26} color={colors.textMuted} />
    </Container>
  );
}

export { SearchBar };
