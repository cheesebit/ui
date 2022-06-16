module.exports = {
	presets: [ '@babel/preset-env', '@babel/preset-react' ],
	plugins: [
		[ '@babel/plugin-proposal-class-properties', { loose: true } ],
		'@babel/plugin-proposal-optional-chaining',
		'@babel/plugin-proposal-nullish-coalescing-operator',
		'@babel/plugin-proposal-async-generator-functions',
		'ramda',
		[
			require.resolve( 'babel-plugin-module-resolver' ),
			{
				root: [ './' ],
				alias: {
					test: './test',
					common: './src/common',
					styles: './src/styles',
					atoms: './src/atoms',
					molecules: './src/molecules',
					organisms: './src/organisms',
					hocs: './src/hocs',
					hooks: './src/hooks',
				},
			},
		],
	],
};
