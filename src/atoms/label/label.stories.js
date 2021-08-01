import React from 'react';

import { Input } from '../input';
import Label from './label';

export default {
	title: 'Components/Atoms/Label',
	component: Label,
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
				This is me, a cool Label (Field) ready to be played around. Try me :)
			</p>

			<Label { ...args } />
		</div>
	);
}

Playground.args = {
	label: 'My cool field',
	children: <Input type="text" />,
};
