import React from 'react';

import { useSyncFruits, useAsyncUsers } from './select.fixtures';
import Select from './select';

export default {
	title: 'Components/Molecules/Select',
	component: Select,
	argTypes: {
		unroll: {
			control: {
				type: 'select',
				options: [ 'right', 'left', 'block' ],
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
		onChange: {
			action: 'changed',
			table: {
				disable: true,
			},
		},
	},
};

export function Playground( ) {
	return (
		<div className="block">
			<p className="mb-2">This is me, a cool Select.</p>
			<p className="mb-2">
				As I&apos;m <b>still a work in progress</b>, there&apos;s some maintenance going on, but
				soon enough you will be able to try me :)
			</p>

			<Select datasources={ [ useSyncFruits, useAsyncUsers ] } />
		</div>
	);
}

// export function Playground( args ) {
// 	return (
// 		<div className="block">
// 			<p className="mb-2">This is me, a cool Select.</p>
// 			<p className="mb-2">
// 				As I&apos;m <b>still a work in progress</b>, there&apos;s some maintenance going on, but
// 				soon enough you will be able to try me :)
// 			</p>

// 			<Select { ...args } />
// 		</div>
// 	);
// }

// Playground.args = {
// 	options: generateSelectOptions(),
// 	placeholder: 'Select or Search',
// };

