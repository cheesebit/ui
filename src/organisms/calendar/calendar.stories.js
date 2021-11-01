import React from 'react';

import Calendar from './calendar';

export default {
	title: 'Components/Organisms/Calendar',
	component: Calendar,
};

export function Playground(args) {
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool Calendar still under development, but
				don&apos;t feel afraid to try me :)
			</p>

			<Calendar {...args} className="p-4 border" />
		</div>
	);
}
