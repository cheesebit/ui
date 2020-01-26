const webpackConfig = require('./setup/webpack');

module.exports = {
  stories: ['./pages/**/*.stories.(js|mdx)', '../src/**/*.stories.(js|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-docs'
  ],
  webpackFinal: webpackConfig
};
