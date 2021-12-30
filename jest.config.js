module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/*.js',
    '!src/lib/*/*.*',
    '!src/index.js',
    '!src/config/*.*',
    '!src/config/*/*.*',
    '!src/*/config/*.*',
    '!src/*/config/*/*.*',
    '!src/*/styles/*.*',
    '!src/**/*.routes.js',
    '!src/**/*.styles.js',
    '!src/**/*.actions.js',
    '!src/**/*.saga.js',
    '!src/**/*.types.js',
    '!src/**/*.constants.js',
    '!src/**/index.js',
    '!src/**/*.dependencies.js',
    '!src/*/global-styles.js',
    '!src/*/*/Loadable.{js,jsx}',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js',
  },
  testPathIgnorePatterns: ['node_modules', 'dist'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['./internals/testing/enzyme-setup.js'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  },
};
