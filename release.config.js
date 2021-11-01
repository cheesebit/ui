module.exports = {
	branches: [ 'main' ],
	plugins: [
		[
			'@semantic-release/commit-analyzer',
			{
				preset: 'angular',
				releaseRules: [
					{ breaking: true, release: 'major' },
					{ type: 'refactor', release: 'patch' },
					{ type: 'style', release: 'patch' },
					{ type: 'release', release: 'patch' },
				],
				parserOpts: {
					noteKeywords: [ 'BREAKING CHANGE', 'BREAKING CHANGES' ],
				},
			},
		],
		'@semantic-release/release-notes-generator',
		[
			'@semantic-release/changelog',
			{
				changelogFile: 'CHANGELOG.md',
			},
		],
		[
			'@semantic-release/npm',
			{
				npmPublish: true,
			},
		],
		[
			'@semantic-release/github',
			{
				assets: 'dist/**/*.{js,map}',
			},
		],
		[
			'@semantic-release/git',
			{
				assets: [ 'CHANGELOG.md', 'package.json' ],
				message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
			},
		],
	],
};
