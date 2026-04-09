import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BookmarkIcon, HomeIcon, SearchIcon } from '../components/Icons';
import { Movie } from '../data/movies';
import { DetailScreen } from '../screens/DetailScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { WatchlistScreen } from '../screens/WatchlistScreen';
import { colors } from '../theme';

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  'Watch list': undefined;
};

export type RootStackParamList = {
  Tabs: undefined;
  Detail: {
    movie: Movie;
  };
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

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

function renderTabBarIcon(routeName: keyof RootTabParamList, focused: boolean, color: string) {
  if (routeName === 'Home') {
    return <HomeIcon active={focused} color={color} />;
  }

  if (routeName === 'Search') {
    return <SearchIcon active={focused} color={color} />;
  }

  return <BookmarkIcon active={focused} color={color} />;
}

function TabsNavigator() {
  return (
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
        tabBarIcon: ({ focused, color }) =>
          renderTabBarIcon(route.name, focused, color),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Watch list" component={WatchlistScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabsNavigator} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { AppNavigator };
