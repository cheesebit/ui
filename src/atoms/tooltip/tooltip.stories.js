import React from 'react';

import Tooltip from './tooltip';

export default {
	title: 'Components/Atoms/Tooltip',
	component: Tooltip,
	argTypes: {
		children: {
			table: {
				disable: true,
			},
		},
	},
};

export function Playground( args ) {
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool Tooltip ready to be played around. Try me :)
			</p>

			<Tooltip { ...args } />
		</div>
	);
}

Playground.args = {
	title: 'Hi there dear reader.',
	children: <span>Hover me to see my tooltip!</span>,
};
