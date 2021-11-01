module.exports = {
	plugins: ['stylelint-order'],
	extends: [
		'stylelint-config-standard-scss',
		'stylelint-config-rational-order',
		'stylelint-config-prettier',
	],
	ignoreFiles: ['node_modules/', '**/*.json'],
	rules: {
		'color-function-notation': 'legacy',
		'at-rule-no-unknown': null,
		'scss/at-rule-no-unknown': true,
		'selector-class-pattern': null,
		'scss/at-import-partial-extension': null,
	},
};
