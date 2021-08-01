import React from 'react';

import { Checkbox } from '../checkbox';
import { range } from 'common/toolset';
import generator from 'test/data-generator';
import List from './list';

export default {
	title: 'Components/Molecules/List',
	component: List,

	argTypes: {
		bordered: {
			control: {
				type: 'boolean',
			},
		},
		striped: {
			control: {
				type: 'boolean',
			},
		},
		hoverable: {
			control: {
				type: 'boolean',
			},
		},
	},
};

export function Playground( args ) {
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool List ready to be played around. Try me :)
			</p>

			<List { ...args } />
		</div>
	);
}

Playground.args = {
	children: (
		<React.Fragment>
			{ range( 0, generator.natural( { min: 5, max: 10 } ) ).map( ( value ) => (
				<List.Item
					key={ value }
					leading={
						<Checkbox
							id={ value }
							aria-label="List item 1"
							name="list"
							value={ value }
						/>
					}
					as="label"
				>
					{ generator.sentence() }
				</List.Item>
			) ) }
		</React.Fragment>
	),
};
