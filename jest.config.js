
module.exports = {
  testMatch: [
    '**/?(*.)(spec).js?(x)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>./server/__test__/*.js',
  ],
  setupFiles: [
    './src/tests/setupTests.js',

  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  moduleNameMapper: {
    '\\.(css|scss|jpg|png|svg)$': '<rootDir>/src/empty-module.js',
  },
  bail: true,
  collectCoverageFrom: [
    'src/components/**/*.*',
    'src/reducer/*.js',
    'src/actions/*.js',
  ],
  coverageReporters: [
    'cobertura',
    'html',
    'text',
    'text-summary',
  ],
};
