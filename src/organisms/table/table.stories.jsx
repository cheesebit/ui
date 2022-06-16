import React from 'react';

import { generateTableData } from './table.fixtures';
import Table from './table';

export default {
	title: 'Components/Organisms/Table',
	component: Table,
};

export function Playground( args ) {
	return (
		<div className="block w-full">
			<p className="mb-2">
				This is me, a cool Table, I&apos;m still a work in progress,
				there&apos;s some maintenance going on, but soon enough you will
				be able to try me :)
			</p>

			<Table { ...args } />
		</div>
	);
}

Playground.args = {
	data: generateTableData(),
	hoverable: true,
	columns: [
		{
			name: 'company',
		},
		{
			name: 'profession',
		},
		{
			name: 'salary',
			props: {
				style: {
					width: '100px',
					textAlign: 'right',
				},
			},
		},
	],
};
