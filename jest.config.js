/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  // Note: https://stackoverflow.com/a/57916712/15076557
  transformIgnorePatterns: [
    'node_modules/(?!(module-that-needs-to-be-transformed)/)',
  ],
  moduleNameMapper: {
    '@/Function/(.*)': '<rootDir>/src/resources/ts/$1',
    '@/Interface/(.*)': '<rootDir>/src/resources/interface/$1',
    '@/Component/(.*)': '<rootDir>/src/resources/components/$1',
    '@/Test/(.*)': '<rootDir>/src/test/$1',
  },
};
