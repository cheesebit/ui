module.exports = {
  moduleNameMapper: {
    '\\.(sa|sc|c)ss$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '<rootDir>/src/common/logger',
    '<rootDir>/src/atoms/icon/assets/',
  ],
  setupFilesAfterEnv: ['<rootDir>/test/setup'],
};
