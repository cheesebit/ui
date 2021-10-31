import React from 'react';

import Input from './input';
import generator from 'test/data-generator';

export default {
	title: 'Components/Atoms/Input',
	component: Input,
	argTypes: {
		className: {
			table: {
				disable: true,
			},
		},
		leading: {
			options: {
				icon: <span>&clubs;</span>,
				text: generator.word(),
				nothing: null,
			},
			control: { type: 'select' },
		},
		trailing: {
			options: {
				icon: <span>&spades;</span>,
				text: generator.word(),
				nothing: null,
			},
			control: { type: 'select' },
		},
		variant: {
			options: ['info', 'success', 'warn', 'danger'],
			control: { type: 'select' },
		},
	},
};

export function Playground(args) {
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool Input ready to be played around. Try me :)
			</p>

			<Input {...args} />
		</div>
	);
}
