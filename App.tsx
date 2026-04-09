import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { WatchlistProvider } from './src/context/WatchlistContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { colors } from './src/theme';

function App() {
  return (
    <SafeAreaProvider>
      <WatchlistProvider>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />
        <AppNavigator />
      </WatchlistProvider>
    </SafeAreaProvider>
  );
}

export default App;
