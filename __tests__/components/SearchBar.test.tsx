import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { SearchBar } from '../../src/components/SearchBar';

describe('SearchBar', () => {
  it('passes the expected input props and handlers', () => {
    const onChangeText = jest.fn();
    const onFocus = jest.fn();

    render(
      <SearchBar
        value="batman"
        editable={false}
        onChangeText={onChangeText}
        onFocus={onFocus}
      />,
    );

    const input = screen.getByPlaceholderText('Search');

    input.props.onChangeText('superman');
    input.props.onFocus();

    expect(screen.getByPlaceholderText('Search')).toBeOnTheScreen();
    expect(input.props.editable).toBe(false);
    expect(onChangeText).toHaveBeenCalledWith('superman');
    expect(onFocus).toHaveBeenCalled();
  });
});
