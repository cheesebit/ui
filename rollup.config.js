const { terser } = require('rollup-plugin-terser');
const { uglify } = require('rollup-plugin-uglify');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const del = require('rollup-plugin-delete');
const external = require('rollup-plugin-peer-deps-external');
const packageJSON = require('./package.json');
const resolve = require('rollup-plugin-node-resolve');
const scss = require('rollup-plugin-scss');
const fs = require('fs');

const { writeFileSync } = fs;
const input = './src/index.js';
const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, '.min.js');

module.exports = [
  // CommonJS
  {
    input,
    output: [
      {
        file: packageJSON.browser,
        format: 'umd',
        sourcemap: true,
        name: 'main',
        globals: {
          react: 'React',
        },
      },
      {
        file: 'demo/src/cheesebit-ui.js',
        format: 'esm',
        banner: '/* eslint-disable */',
      },
    ],
    plugins: [
      del({ targets: ['dist/*', 'demo/src/cheesebit-ui.*'] }),
      scss({
        output: function(styles, styleNodes) {
          writeFileSync('dist/styles.css', styles);
          writeFileSync('demo/src/cheesebit-ui.css', styles);
        },
      }),
      babel({
        exclude: 'node_modules/**',
      }),
      external(),
      resolve(),
      commonjs(),
    ],
  },
  // {
  //   input,
  //   output: {
  //     file: minifyExtension(packageJSON.main),
  //     format: 'cjs',
  //     sourcemap: true,
  //     name: 'main',
  //     globals: {
  //       react: 'React',
  //     },
  //   },
  //   plugins: [
  //     scss(),
  //     babel({
  //       exclude: 'node_modules/**',
  //     }),
  //     external(),
  //     resolve(),
  //     commonjs(),
  //     uglify(),
  //   ],
  // },
  // // UMD
  // {
  //   input,
  //   output: {
  //     file: packageJSON.browser,
  //     format: 'umd',
  //     sourcemap: true,
  //     name: 'main',
  //     globals: {
  //       react: 'React',
  //     },
  //   },
  //   plugins: [
  //     scss(),
  //     babel({
  //       exclude: 'node_modules/**',
  //     }),
  //     external(),
  //     resolve(),
  //     commonjs(),
  //   ],
  // },
  // {
  //   input,
  //   output: {
  //     file: minifyExtension(packageJSON.browser),
  //     format: 'umd',
  //     sourcemap: true,
  //     name: 'main',
  //     globals: {
  //       react: 'React',
  //     },
  //   },
  //   plugins: [
  //     scss(),
  //     babel({
  //       exclude: 'node_modules/**',
  //     }),
  //     external(),
  //     resolve(),
  //     commonjs(),
  //     terser(),
  //   ],
  // },
  // // ES
  // {
  //   input,
  //   output: {
  //     file: packageJSON.module,
  //     format: 'es',
  //     sourcemap: true,
  //     exports: 'named',
  //   },
  //   plugins: [
  //     scss(),
  //     babel({
  //       exclude: 'node_modules/**',
  //     }),
  //     external(),
  //     resolve(),
  //     commonjs(),
  //   ],
  // },
  // {
  //   input,
  //   output: {
  //     file: minifyExtension(packageJSON.module),
  //     format: 'es',
  //     sourcemap: true,
  //     exports: 'named',
  //   },
  //   plugins: [
  //     scss(),
  //     babel({
  //       exclude: 'node_modules/**',
  //     }),
  //     external(),
  //     resolve(),
  //     commonjs(),
  //     terser(),
  //   ],
  // },
];
