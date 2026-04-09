import 'react-native-gesture-handler/jestSetup';

/* global jest */

jest.mock('react-native-safe-area-context', () => {
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => ({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }),
  };
});

jest.mock('react-native-fast-image', () => {
  const React = require('react');
  const { View } = require('react-native');

  function FastImageMock(props) {
    return React.createElement(View, props, props.children);
  }

  FastImageMock.preload = jest.fn();
  FastImageMock.cacheControl = {
    immutable: 'immutable',
    web: 'web',
    cacheOnly: 'cacheOnly',
  };
  FastImageMock.priority = {
    low: 'low',
    normal: 'normal',
    high: 'high',
  };
  FastImageMock.resizeMode = {
    contain: 'contain',
    cover: 'cover',
    stretch: 'stretch',
    center: 'center',
  };

  return FastImageMock;
});

jest.mock('./assets/icons/searchIcon.svg', () => 'SearchIconSvg');
