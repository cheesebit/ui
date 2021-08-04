import React from 'react';

import generator from 'test/data-generator';
import Dropdown from './dropdown';

export default {
	title: 'Components/Molecules/Dropdown',
	component: Dropdown,
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
	},
};

const generateDropdownOptions = () =>
	generator.array( ( { index } ) => {
		const label = generator.word( { length: 10 } );

		return {
			id: generator.id(),
			children: label,
			// icon: generator.pick(keys(icons)),
			onClick: () => {
				// eslint-disable-next-line no-alert
				alert( `You clicked ${ label } (Index ${ index })` );
			},
		};
	}, 5 );

const ITEMS = generateDropdownOptions();

export function Playground( args ) {
	return <Dropdown { ...args } />;
}

Playground.args = {
	toggle: 'Action',
	unroll: 'right',
	hoverable: true,
	items: ITEMS,
};
