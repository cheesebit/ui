const path = require('path');

const resolve = filePath => path.resolve(__dirname, filePath);

module.exports = async (config, { configType }) => {
  // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [require('autoprefixer')]
        }
      },
      {
        loader: 'sass-loader'
      },
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            resolve('../../src/styles/settings/_index.scss'),
            resolve('../../src/styles/tools/_index.scss')
          ]
        }
      }
    ]
  });

  // Return the altered config
  return config;
};
