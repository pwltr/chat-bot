module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '^@src(.*)$': '<rootDir>/src$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@services(.*)$': '<rootDir>/src/services$1',
    '^@styles(.*)$': '<rootDir>/src/styles$1',
  },
}
