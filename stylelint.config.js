module.exports = {
	plugins: [ 'stylelint-scss', 'stylelint-order' ],
	extends: [ 'stylelint-config-recommended', 'stylelint-config-rational-order', 'stylelint-config-prettier' ],
	ignoreFiles: [
		'node_modules/',
		'**/*.json',
	],
	rules: {
		'order/order': [
			'dollar-variables',
			'declarations',
		],
		'plugin/rational-order': [ true, {
			'border-in-box-model': false,
			'empty-line-between-groups': true,
		} ],
		'at-rule-no-unknown': null,
		'scss/at-rule-no-unknown': true,
	},
};
