import React from 'react';

import Input from './input';
import generator from 'test/data-generator';
import { useMask } from 'hooks/mask';

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
			control: { type: 'radio' },
		},
		trailing: {
			options: {
				icon: <span>&spades;</span>,
				text: generator.word(),
				nothing: null,
			},
			control: { type: 'radio' },
		},
		variant: {
			options: [ 'info', 'success', 'warn', 'danger' ],
			control: { type: 'radio' },
		},
	},
};

export function Playground( args ) {
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool Input ready to be played around. Try me :)
			</p>

			<Input { ...args } />
		</div>
	);
}

export function Mask( args ) {
	const mask = useMask( { mask: 'ddd.dd' } );
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool Input ready to be played around. Try me :)
			</p>

			<Input { ...args } { ...mask } />
		</div>
	);
}
