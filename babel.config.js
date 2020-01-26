module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: '> 0.5%, ie >= 11'
        }
        // "modules": false,
        // "spec": true,
        // "useBuiltIns": "usage",
        // "forceAllTransforms": true,
        // corejs: {
        //   version: 3,
        //   proposals: false
        // }
      }
    ],
    '@babel/preset-react'
  ],
  ignore: ['node_modules/**'],
  plugins: ['@babel/plugin-proposal-class-properties', 'ramda']
};
