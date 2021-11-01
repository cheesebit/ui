import React from 'react';

import Pagination from './pagination';

export default {
	title: 'Components/Molecules/Pagination',
	component: Pagination,
	argTypes: {
		onChange: {
			action: 'pagination',
			table: {
				disable: true,
			},
		},
	},
};

export function Playground(args) {
	return (
		<div className="block">
			<p className="mb-2">
				This is me, a cool Pagination ready to be played around. Try me
				:)
			</p>

			<Pagination {...args} />
		</div>
	);
}

Playground.args = {
	itemCount: 200,
	pageSize: 10,
};
