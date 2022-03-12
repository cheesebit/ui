import React from 'react';

import generator from 'test/data-generator';
import Radio from './radio';

export default {
	title: 'Components/Atoms/Radio',
	component: Radio,
	argTypes: {
		children: {
			table: {
				disable: true,
			},
		},
		name: {
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
				This is me, a cool Radio button ready to be played around. Try me :)
			</p>

			<div className="flex flex-col space-y">
				<Radio {...args} />
			</div>
		</div>
	);
}

Playground.args = {
	name: generator.word(),
	disabled: false,
};

export function Group(args) {
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool Radio button ready to be played around. Try me :)
			</p>

			<div className="flex flex-col space-y">
				<Radio {...args} value="0">
					{generator.name()}
				</Radio>
				<Radio {...args} value="1">
					{generator.name()}
				</Radio>
				<Radio {...args} value="2">
					{generator.name()}
				</Radio>
			</div>
		</div>
	);
}

Group.args = {
	name: 'radio-group',
	disabled: false,
};
