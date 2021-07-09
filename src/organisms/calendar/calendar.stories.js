import React from 'react';

import Calendar from './calendar';

export default {
	title: 'Organisms/Calendar',
	component: Calendar,
};

export function Playground( args ) {
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool Calendar ready to be played around. Try me :)
			</p>

			<Calendar { ...args } className="p-4 border" />
		</div>
	);
}
