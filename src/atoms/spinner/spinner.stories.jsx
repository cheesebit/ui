import React from 'react';

import Spinner, { CircularSpinner } from './spinner';

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

Playground.args = {
	appear: true,
	children: 'The quick brown fox jumps over the lazy dog',
};

export function Circular( args ) {
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool Spinner ready to be played around. Try me :)
			</p>

			<div className="flex flex-row space-x-4">
				<CircularSpinner { ...args } />
			</div>
		</div>
	);
}

Circular.args = {
	variant: 'neutral',
};
