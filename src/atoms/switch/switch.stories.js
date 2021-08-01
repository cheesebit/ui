import React from 'react';

import Switch from './switch';
import generator from 'test/data-generator';

export default {
	title: 'Components/Atoms/Switch',
	component: Switch,
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
				This is me, a cool Switch family ready to be played around. Try me :)
			</p>
			<div className="flex flex-col space-y-2">
				<Switch { ...args } />
			</div>
		</div>
	);
}

Playground.args = {
	children: generator.name(),
};

export function Default( args ) {
	return (
		<div className="block">
			<div className="flex flex-col space-y-2">
				<Switch { ...args }>{ generator.name() }</Switch>
				<Switch { ...args }>{ generator.name() }</Switch>
				<Switch { ...args }>{ generator.name() }</Switch>
			</div>
		</div>
	);
}
