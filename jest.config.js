module.exports = {
  moduleNameMapper: {
    '\\.(sa|sc|c)ss$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/src/mocks/svg.mock',
  },
  transform: {
    '^.+\\.[jt]s(x)?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['/node_modules/'],
  moduleDirectories: ['node_modules', '<rootDir>/node_modules', '.'],
  setupFilesAfterEnv: ['./test/setup'],
};
