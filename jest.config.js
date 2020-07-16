module.exports = {
  moduleNameMapper: {
    '\\.(sa|sc|c)ss$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '\\.svg$': './test/mocks/svg.mock',
  },
};
