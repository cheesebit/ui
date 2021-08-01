import React from 'react';

import generator from 'test/data-generator';
import Tabbed from './tabbed';

export default {
	title: 'Components/Organisms/Tabbed',
	component: Tabbed,
};

export function Playground( args ) {
	return (
		<div className="block">
			<p className="mb-2">This is me, a cool Tabbed ready to be played around. Try me :)</p>

			<Tabbed { ...args } />
		</div>
	);
}

Playground.args = {
	tabs: [
		{
			id: 'sample-tabbed-tab-home',
			label: 'Home',
		},
		{
			id: 'sample-tabbed-tab-atoms',
			label: 'Atoms',
		},
		{
			id: 'sample-tabbed-tab-molecules',
			label: 'Molecules',
		},
		{
			id: 'sample-tabbed-tab-organisms',
			label: 'Organisms',
		},
	],
	children: (
		<React.Fragment>
			<Tabbed.Panel id="sample-tabbed-tab-home">
				<h3>Home</h3>
				<p>
					{ generator.paragraph( {
						sentences: generator.natural( { min: 5, max: 15 } ),
					} ) }
				</p>
			</Tabbed.Panel>
			<Tabbed.Panel id="sample-tabbed-tab-atoms">
				<h3>Atoms</h3>
				<p>
					{ generator.paragraph( {
						sentences: generator.natural( { min: 5, max: 15 } ),
					} ) }
				</p>
			</Tabbed.Panel>
			<Tabbed.Panel id="sample-tabbed-tab-molecules">
				<h3>Molecules</h3>
				<p>
					{ generator.paragraph( {
						sentences: generator.natural( { min: 5, max: 15 } ),
					} ) }
				</p>
			</Tabbed.Panel>
			<Tabbed.Panel id="sample-tabbed-tab-organisms">
				<h3>Organisms</h3>
				<p>
					{ generator.paragraph( {
						sentences: generator.natural( { min: 5, max: 15 } ),
					} ) }
				</p>
			</Tabbed.Panel>
		</React.Fragment>
	),
};
