import React from 'react';

import { Input } from 'atoms/input';
import Label from './label';
import generator from 'test/data-generator';

export default {
	title: 'Components/Atoms/Label',
	component: Label,
	argTypes: {
		children: {
			table: {
				disable: true,
			},
		},
		trailing: {
			options: {
				icon: <span>&spades;</span>,
				text: generator.word(),
				nothing: null,
			},
			control: { type: 'select' },
		},
	},
};

export function Playground(args) {
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool Label (Field) ready to be played around. Try me :)
			</p>

			<div className="flex flex-col space-y-1">
				<Label {...args} />
				<Input />
			</div>
		</div>
	);
}

Playground.args = {
	children: 'My cool field',
	trailing: <span>&spades;</span>,
	variant: 'neutral',
};
