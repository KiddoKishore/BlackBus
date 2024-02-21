export default {
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
      '^.+\\.(js|html)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'html'],
    transformIgnorePatterns: [
      'node_modules/(?!(babel-jest|esm)/)',
    ],
  };
  