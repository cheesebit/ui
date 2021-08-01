import React from 'react';

import Spinner from './spinner';

export default {
	title: 'Components/Atoms/Spinner',
	component: Spinner,
};

export function Playground( args ) {
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool Spinner ready to be played around. Try me :)
			</p>

			<div className="flex flex-row space-x-4">
				<Spinner { ...args } />
			</div>
		</div>
	);
}
