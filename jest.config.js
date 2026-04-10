module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__tests__/mocks/svgMock.js',
  },
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/__tests__/fixtures/', '<rootDir>/__tests__/mocks/'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native|@react-navigation|react-native-safe-area-context)/)',
  ],
};
