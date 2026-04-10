import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';

import App from '../App';

jest.mock('../src/navigation/AppNavigator', () => ({
  AppNavigator: () => {
    const React = require('react');
    const { Text } = require('react-native');
    return <Text>app navigator</Text>;
  },
}));

test('renders the app navigator', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText('app navigator')).toBeOnTheScreen();
  });
});
