module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended-with-formatting' ],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
		project: [ './jsconfig.json' ],
	},
	rules: {
		'no-shadow': 'warn',
		'no-unused-expressions': 'warn',
		eqeqeq: 0,
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
				moduleDirectory: [ 'node_modules', '.',
				],
			},
		},
	},
};
