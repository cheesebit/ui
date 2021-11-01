module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
		project: ['./jsconfig.json'],
	},
	rules: {
		'no-shadow': 'warn',
		'no-unused-expressions': 'warn',
		'no-unused-vars': 'warn',
		// 'jsdoc/valid-types': 'warn',
		// 'jsx-a11y/aria-props': 'warn', // well, none and presentation are real valir roles
		eqeqeq: 0,
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				moduleDirectory: ['node_modules', '.'],
			},
		},
	},
};
