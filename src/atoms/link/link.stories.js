import React from 'react';

import generator from 'test/data-generator';
import Link from './link';

export default {
	title: 'Components/Atoms/Link',
	component: Link,
};

export function Playground( args ) {
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool Link ready to be played around. Try me :)
			</p>

			<Link { ...args } />
		</div>
	);
}

Playground.args = {
	children: generator.profession(),
};
