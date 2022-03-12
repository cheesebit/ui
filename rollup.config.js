import { terser } from 'rollup-plugin-terser';
import analyze from 'rollup-plugin-analyzer';

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

module.exports = {
	input: {
		badge: `${ATOMS_PATH_PREFIX}/badge/index.js`,
		button: `${ATOMS_PATH_PREFIX}/button/index.js`,
		checkbox: `${ATOMS_PATH_PREFIX}/checkbox/index.js`,
		icon: `${ATOMS_PATH_PREFIX}/icon/index.js`,
		image: `${ATOMS_PATH_PREFIX}/image/index.js`,
		input: `${ATOMS_PATH_PREFIX}/input/index.js`,
		label: `${ATOMS_PATH_PREFIX}/label/index.js`,
		link: `${ATOMS_PATH_PREFIX}/link/index.js`,
		list: `${ATOMS_PATH_PREFIX}/list/index.js`,
		overlay: `${ATOMS_PATH_PREFIX}/overlay/index.js`,
		page: `${ATOMS_PATH_PREFIX}/page/index.js`,
		panels: `${ATOMS_PATH_PREFIX}/panels/index.js`,
		radio: `${ATOMS_PATH_PREFIX}/radio/index.js`,
		spinner: `${ATOMS_PATH_PREFIX}/spinner/index.js`,
		tooltip: `${ATOMS_PATH_PREFIX}/tooltip/index.js`,
		// card: `${MOLECULES_PATH_PREFIX}/card/index.js`,
		dropdown: `${MOLECULES_PATH_PREFIX}/dropdown/index.js`,
		pagination: `${MOLECULES_PATH_PREFIX}/pagination/index.js`,
		select: `${MOLECULES_PATH_PREFIX}/select/index.js`,
		tabs: `${MOLECULES_PATH_PREFIX}/tabs/index.js`,
		calendar: `${ORGANISMS_PATH_PREFIX}/calendar/index.js`,
		'date-picker': `${ORGANISMS_PATH_PREFIX}/date-picker/index.js`,
		form: `${ORGANISMS_PATH_PREFIX}/form/index.js`,
		tabbed: `${ORGANISMS_PATH_PREFIX}/tabbed/index.js`,
		table: `${ORGANISMS_PATH_PREFIX}/table/index.js`,
		wizard: `${ORGANISMS_PATH_PREFIX}/wizard/index.js`,
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
			processor: (css) =>
				postcss([cssnano])
					.process(css)
					.then((result) => result.css),
		}),
		babel({
			exclude: 'node_modules/**', // only transpile our source code
			babelHelpers: 'bundled',
			extensions: ['.js', '.jsx'],
		}),
		resolve({
			preferBuiltins: true,
			extensions: ['.js', '.jsx'],
		}),
		commonjs(),
		json(),
		svgr(),
		terser(),
		gzip(),
		analyze({
			hideDeps: true,
			summaryOnly: true,
			filter: (module) => /^\/src/.test(module.id),
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
};
