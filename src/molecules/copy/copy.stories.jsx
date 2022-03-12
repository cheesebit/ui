import React from 'react';

import generator from 'test/data-generator';
import Copy from './copy';

export default {
	title: 'Components/Molecules/Copy',
	component: Copy,
	argTypes: {
		onCopy: {
			action: 'copied',
			table: {
				disable: true,
			},
		},
	},
};

export function Playground(args) {
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool Copy to Clipboard ready to be played around. Try me :)
			</p>

			<Copy {...args} />
		</div>
	);
}

Playground.args = {
	value: generator.animal(),
};
