import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BookmarkIcon, HomeIcon, SearchIcon } from '../components/Icons';
import { HomeScreen } from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { WatchlistScreen } from '../screens/WatchlistScreen';
import { colors } from '../theme';

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  'Watch list': undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.background,
    border: colors.surfaceBorder,
    text: colors.text,
    primary: colors.accent,
  },
};

function AppNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.surfaceBorder,
            height: 88,
            paddingTop: 10,
            paddingBottom: 12,
          },
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: '600',
          },
          tabBarIcon: ({ focused, color }) => {
            if (route.name === 'Home') {
              return <HomeIcon active={focused} color={color} />;
            }

            if (route.name === 'Search') {
              return <SearchIcon active={focused} color={color} />;
            }

            return <BookmarkIcon active={focused} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Watch list" component={WatchlistScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export { AppNavigator };
