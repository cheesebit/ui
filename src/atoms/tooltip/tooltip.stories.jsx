import React from 'react';

import generator from 'test/data-generator';
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
		placement: {
			options: [
				'top-start',
				'top-center',
				'top-end',
				'bottom-start',
				'bottom-center',
				'bottom-end',
				'left-start',
				'left-center',
				'left-end',
				'right-start',
				'right-center',
				'right-end',
			],
			control: {
				type: 'radio',
			},
		},
	},
};

export function Playground( args ) {
	return (
		<div className="block text-center">
			<p className="mb-2">
				This is me, a cool tooltip ready to be played around. Try me :)
			</p>

			<Tooltip { ...args } />
		</div>
	);
}

Playground.args = {
	text: generator.sentence( { words: 4 } ),
	children: (
		<span className="p-2 bg-gray-100 rounded">
			Hover me to see my tooltip!
		</span>
	),
};
