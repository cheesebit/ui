import React from 'react';

import generator from '../../../test/data-generator';
import Link from './link';

export default {
	title: 'Atoms/Link',
	component: Link,
};

export function Playground( args ) {
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool Link ready to be played around. Try me :)
			</p>

			<Link { ...args }>{ generator.profession() }</Link>
		</div>
	);
}
