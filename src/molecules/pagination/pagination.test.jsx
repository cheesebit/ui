import React from 'react';
import { composeStories } from '@storybook/testing-react';

import { fireEvent, render, screen } from 'test/helpers';
import * as stories from './pagination.stories';

const { Playground } = composeStories( stories );

describe( '<Pagination />', () => {
	it( 'renders correctly', () => {
		const props = { itemCount: 15, pageSize: 5 };

		render( <Playground { ...props } /> );

		expect( screen.getByLabelText( 'go to previous page' ) ).toBeDisabled();
		expect(
			screen.getByRole( 'tab', { selected: true } )
		).toHaveTextContent( '1' );
	} );

	it( 'navigates to next page', () => {
		const props = { itemCount: 15, pageSize: 5 };

		render( <Playground { ...props } /> );

		expect(
			screen.getByRole( 'tab', { selected: true } )
		).toHaveTextContent( '1' );

		expect( screen.getByLabelText( 'go to next page' ) ).not.toBeDisabled();
		fireEvent.click( screen.getByLabelText( 'go to next page' ) );

		expect(
			screen.getByRole( 'tab', { selected: true } )
		).toHaveTextContent( '2' );
	} );

	it( 'navigates to specific page', () => {
		const props = { itemCount: 15, pageSize: 5 };

		render( <Playground { ...props } /> );

		expect(
			screen.getByRole( 'tab', { selected: true } )
		).toHaveTextContent( '1' );

		fireEvent.click( screen.getByText( '3' ) );

		expect(
			screen.getByRole( 'tab', { selected: true } )
		).toHaveTextContent( '3' );
	} );
} );
