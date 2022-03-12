import React from 'react';

import { useSyncFruits, useAsyncUsers, FRUITS, USERS } from './select.fixtures';
import Select from './select';

export default {
	title: 'Components/Molecules/Select',
	component: Select,
	argTypes: {
		unroll: {
			options: ['right', 'left', 'block'],
			control: {
				type: 'select',
			},
		},
		className: {
			table: {
				disable: true,
			},
		},
		multiple: {
			control: {
				type: 'boolean',
			},
		},
		id: {
			table: {
				disable: true,
			},
		},
		value: {
			table: {
				disable: true,
			},
		},
		options: {
			table: {
				disable: true,
			},
		},
		datasources: {
			table: {
				disable: true,
			},
		},
		onChange: {
			action: 'changed',
			table: {
				disable: true,
			},
		},
	},
};

export function Playground(args) {
	return (
		<div className="flex flex-col">
			<div className="block">
				<p className="mb-2">This is me, a cool Select.</p>
				<p className="mb-2">
					As I&apos;m <b>still a work in progress</b>, there&apos;s some maintenance going
					on, but soon enough you will be able to try me :)
				</p>

				<Select {...args} />
			</div>
			<strong className="mt-2">Available options:</strong>
			<p className="mt-2">{FRUITS.map((fruit) => fruit.name).join(', ')}</p>
			<p className="mt-2">{USERS.map((user) => user.name).join(', ')}</p>
		</div>
	);
}

Playground.args = {
	placeholder: 'Search or select',
	datasources: [useSyncFruits, useAsyncUsers],
	multiple: true,
};
