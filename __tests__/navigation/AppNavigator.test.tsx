import React from 'react';
import { render } from '@testing-library/react-native';

import { AppNavigator } from '../../src/navigation/AppNavigator';

type IconProps = { active?: boolean; color?: string };
type StackScreenProps = { name: string; component: React.ComponentType };
type TabScreenProps = { name: string };
type TabNavigatorProps = {
  children: React.ReactNode;
  screenOptions: (args: { route: { name: string } }) => {
    tabBarIcon: (args: { focused: boolean; color: string }) => React.ReactElement;
  };
};

const mockHomeIcon = jest.fn((_: IconProps) => null);
const mockSearchIcon = jest.fn((_: IconProps) => null);
const mockBookmarkIcon = jest.fn((_: IconProps) => null);
const mockStackScreen = jest.fn((_: StackScreenProps) => null);
const mockTabScreen = jest.fn((_: TabScreenProps) => null);
const mockTabNavigator = jest.fn(({ children }: TabNavigatorProps) => <>{children}</>);

jest.mock('../../src/components/Icons', () => ({
  HomeIcon: (props: unknown) => mockHomeIcon(props as IconProps),
  SearchIcon: (props: unknown) => mockSearchIcon(props as IconProps),
  BookmarkIcon: (props: unknown) => mockBookmarkIcon(props as IconProps),
}));

jest.mock('../../src/screens/HomeScreen', () => ({ HomeScreen: 'HomeScreen' }));
jest.mock('../../src/screens/SearchScreen', () => ({ SearchScreen: 'SearchScreen' }));
jest.mock('../../src/screens/WatchlistScreen', () => ({ WatchlistScreen: 'WatchlistScreen' }));
jest.mock('../../src/screens/DetailScreen', () => ({ DetailScreen: 'DetailScreen' }));

jest.mock('@react-navigation/native', () => ({
  DefaultTheme: { colors: {} },
  NavigationContainer: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: (props: TabNavigatorProps) => mockTabNavigator(props),
    Screen: (props: TabScreenProps) => {
      mockTabScreen(props);
      return null;
    },
  }),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Screen: (props: unknown) => {
      mockStackScreen(props as StackScreenProps);
      return null;
    },
  }),
}));

describe('AppNavigator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('registers the expected screens and resolves the right tab icons', () => {
    render(<AppNavigator />);

    expect(mockStackScreen.mock.calls.map(call => call[0]?.name)).toEqual(['Tabs', 'Detail']);

    const firstStackCall = mockStackScreen.mock.calls[0];
    expect(firstStackCall).toBeDefined();
    const TabsComponent = firstStackCall![0].component;
    render(<TabsComponent />);

    expect(mockTabScreen.mock.calls.map(call => call[0]?.name)).toEqual([
      'Home',
      'Search',
      'Watch list',
    ]);

    const firstTabNavigatorCall = mockTabNavigator.mock.calls[0];
    expect(firstTabNavigatorCall).toBeDefined();
    const screenOptions = firstTabNavigatorCall![0].screenOptions;

    render(screenOptions({ route: { name: 'Home' } }).tabBarIcon({ focused: true, color: '#fff' }));
    render(
      screenOptions({ route: { name: 'Search' } }).tabBarIcon({
        focused: false,
        color: '#aaa',
      }),
    );
    render(
      screenOptions({ route: { name: 'Watch list' } }).tabBarIcon({
        focused: false,
        color: '#000',
      }),
    );

    expect(mockHomeIcon).toHaveBeenCalledWith(
      expect.objectContaining({ active: true, color: '#fff' }),
    );
    expect(mockSearchIcon).toHaveBeenCalledWith(
      expect.objectContaining({ active: false, color: '#aaa' }),
    );
    expect(mockBookmarkIcon).toHaveBeenCalledWith(
      expect.objectContaining({ active: false, color: '#000' }),
    );
  });
});
