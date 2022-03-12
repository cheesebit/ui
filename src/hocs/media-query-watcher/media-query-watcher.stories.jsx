import React from 'react';

import MediaQueryWatcher from './media-query-watcher';

export default {
	title: 'HOCs/MediaQueryWatcher',
	component: MediaQueryWatcher,
};

export function Playground(args) {
	const [currentMedia, setCurrentMedia] = React.useState(null);

	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool MediaQueryWatcher HOC ready to be played around. Try me :)
			</p>

			<MediaQueryWatcher {...args} onQueryMatch={({ query }) => setCurrentMedia(query)}>
				<p className="p-4 bg-gray-200 border">
					Current matched media <code>{currentMedia}</code>
				</p>
				<p className="mt-4">
					<small>
						You can use the responsive mode in the <b>DevTools</b> tab of your browser
						in order to preview the results for the <code>MediaQueryWatcher</code>.
					</small>
				</p>
			</MediaQueryWatcher>
		</div>
	);
}

Playground.args = {
	initial: true,
	queries: [
		'(max-width: 320px)',
		'(max-width: 375px)',
		'(max-width: 414px)',
		'(max-width: 768px)',
		'(max-width: 834px)',
		'(min-width: 835px)',
	],
};
