import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { SearchIcon } from './Icons';
import { colors, spacing } from '../theme';

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  onFocus?: () => void;
};

function SearchBar({
  placeholder,
  value,
  onChangeText,
  editable = true,
  onFocus,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        onFocus={onFocus}
        style={styles.input}
      />
      <SearchIcon size={26} color={colors.textMuted} />
    </View>
  );
}

export { SearchBar };

const styles = StyleSheet.create({
  container: {
    height: 62,
    borderRadius: 22,
    backgroundColor: colors.surfaceMuted,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 17,
  },
});
