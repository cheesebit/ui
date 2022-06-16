import React from 'react';
import { composeStories } from '@storybook/testing-react';

import { generateTableData } from './table.fixtures';
import { render, screen, within } from 'test/helpers';
import * as stories from './table.stories';

const { Playground } = composeStories( stories );

const COLUMNS = [
	{
		name: 'company',
	},
	{
		name: 'profession',
	},
	{
		name: 'salary',
	},
];

describe( 'Table', () => {
	it( 'renders correctly', () => {
		const props = { columns: COLUMNS, data: generateTableData() };

		render( <Playground { ...props } /> );
		const component = screen.getByTestId( 'cb-table' );
		const rows = screen.getAllByTestId( 'row' );

		expect( component ).toBeTruthy();
		expect( rows ).toHaveLength( props.data.length );

		for ( let i = 0; i < props.data.length; i++ ) {
			const entry = props.data[ i ];

			for ( const column of props.columns ) {
				expect(
					within( rows[ i ] ).getByTestId( column.name )
				).toHaveTextContent( String( entry[ column.name ] ) );
			}
		}
	} );
} );
