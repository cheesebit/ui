import { terser } from 'rollup-plugin-terser';
import analyze from 'rollup-plugin-analyzer';
import autoprefixer from 'autoprefixer';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import cssnano from 'cssnano';
import del from 'rollup-plugin-delete';
import external from 'rollup-plugin-peer-deps-external';
import gzip from 'rollup-plugin-gzip';
import json from '@rollup/plugin-json';
import postcss from 'postcss';
import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import svgr from '@svgr/rollup';
import pkg from './package.json';

const ATOMS_PATH_PREFIX = './src/atoms';
const MOLECULES_PATH_PREFIX = './src/molecules';
const ORGANISMS_PATH_PREFIX = './src/organisms';
const HOC_PATH_PREFIX = './src/hocs';

module.exports = [
  {
    input: {
      badge: `${ATOMS_PATH_PREFIX}/badge/index`,
      button: `${ATOMS_PATH_PREFIX}/button/index`,
      checkbox: `${ATOMS_PATH_PREFIX}/checkbox/index`,
      icon: `${ATOMS_PATH_PREFIX}/icon/index`,
      image: `${ATOMS_PATH_PREFIX}/image/index`,
      input: `${ATOMS_PATH_PREFIX}/input/index`,
      label: `${ATOMS_PATH_PREFIX}/label/index`,
      link: `${ATOMS_PATH_PREFIX}/link/index`,
      list: `${ATOMS_PATH_PREFIX}/list/index`,
      overlay: `${ATOMS_PATH_PREFIX}/overlay/index`,
      page: `${ATOMS_PATH_PREFIX}/page/index`,
      panels: `${ATOMS_PATH_PREFIX}/panels/index`,
      radio: `${ATOMS_PATH_PREFIX}/radio/index`,
      spinner: `${ATOMS_PATH_PREFIX}/spinner/index`,
      tooltip: `${ATOMS_PATH_PREFIX}/tooltip/index`,
      card: `${MOLECULES_PATH_PREFIX}/card/index`,
      dropdown: `${MOLECULES_PATH_PREFIX}/dropdown/index`,
      pagination: `${MOLECULES_PATH_PREFIX}/pagination/index`,
      select: `${MOLECULES_PATH_PREFIX}/select/index`,
      tabs: `${MOLECULES_PATH_PREFIX}/tabs/index`,
      calendar: `${ORGANISMS_PATH_PREFIX}/calendar/index`,
      'date-picker': `${ORGANISMS_PATH_PREFIX}/date-picker/index`,
      form: `${ORGANISMS_PATH_PREFIX}/form/index`,
      tabbed: `${ORGANISMS_PATH_PREFIX}/tabbed/index`,
      table: `${ORGANISMS_PATH_PREFIX}/table/index`,
      wizard: `${ORGANISMS_PATH_PREFIX}/wizard/index`,
      'click-outside': `${HOC_PATH_PREFIX}/click-outside/index.js`,
      'media-query-watcher': `${HOC_PATH_PREFIX}/media-query-watcher/index.js`,
      'overflow-watcher': `${HOC_PATH_PREFIX}/overflow-watcher/index.js`,
      'resize-watcher': `${HOC_PATH_PREFIX}/resize-watcher/index.js`,
      'shortcut-watcher': `${HOC_PATH_PREFIX}/shortcut-watcher/index.js`,
    },
    external: ['react', 'react-dom'],
    plugins: [
      del({ targets: [`dist/`] }),
      external(),
      scss({
        // output: `dist/${pkg.version}/styles.css`, version specific
        output: 'dist/styles.css',
        prefix: `
          @import "./src/styles/_settings.scss";
          @import "./src/styles/_tools.scss";
        `,
        processor: css =>
          postcss([autoprefixer, cssnano])
            .process(css)
            .then(result => result.css),
      }),
      babel({
        exclude: 'node_modules/**', // only transpile our source code
      }),
      resolve({
        preferBuiltins: true,
      }),
      commonjs(),
      json(),
      svgr(),
      terser(),
      gzip(),
      analyze({
        hideDeps: true,
        summaryOnly: true,
        filter: module => /^\/src/.test(module.id),
      }),
    ],
    output: [
      {
        dir: `dist/${pkg.version}`,
        // dir: 'dist',
        format: 'esm',
        sourcemap: true,
      },
    ],
  },
];
