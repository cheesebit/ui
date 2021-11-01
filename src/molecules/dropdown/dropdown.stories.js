import React from 'react';

import { generateDropdownOptions } from './dropdown.fixtures';
import Dropdown from './dropdown';

export default {
	title: 'Components/Molecules/Dropdown',
	component: Dropdown,
	argTypes: {
		unroll: {
			control: {
				type: 'select',
				options: ['right', 'left', 'block'],
			},
		},
		className: {
			table: {
				disable: true,
			},
		},
	},
};

const ITEMS = generateDropdownOptions();

export function Playground(args) {
	return (
		<Dropdown {...args}>
			<Dropdown.Trigger>Actions</Dropdown.Trigger>
			<Dropdown.Menu>
				{ITEMS.map(({ label, onClick }) => (
					<Dropdown.Item key={label} onClick={onClick}>
						{label}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
}

Playground.args = {
	trigger: 'Action',
	unroll: 'right',
	hoverable: true,
	items: ITEMS,
};
