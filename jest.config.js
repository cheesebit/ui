module.exports = {
  moduleNameMapper: {
    '\\.(sa|sc|c)ss$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
};
