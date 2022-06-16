import React from 'react';
import { composeStories } from '@storybook/testing-react';

import { render, screen } from 'test/helpers';

import * as stories from './spinner.stories';
import generator from 'test/data-generator';

const { Circular } = composeStories( stories );

describe( 'Spinner', () => {
	it( 'renders correctly', () => {
		const props = {
			children: generator.word(),
		};

		render( <Circular { ...props } /> );
		const component = screen.getByTestId( 'cb-circular-spinner' );

		expect( component ).toBeTruthy();
		expect( component ).toHaveTextContent( props.children );
	} );

	describe( 'with variant', () => {
		it( `renders correctly with variant ${ 'primary' }`, () => {
			const props = { children: generator.word(), variant: 'primary' };

			render( <Circular { ...props } /> );
			const component = screen.getByTestId( 'cb-circular-spinner' );

			expect( component ).toBeTruthy();
			expect( component ).toHaveClass( '-primary' );
		} );

		it( `renders correctly with variant ${ 'secondary' }`, () => {
			const props = { children: generator.word(), variant: 'secondary' };

			render( <Circular { ...props } /> );
			const component = screen.getByTestId( 'cb-circular-spinner' );

			expect( component ).toBeTruthy();
			expect( component ).toHaveClass( '-secondary' );
		} );

		it( `renders correctly with variant ${ 'terciary' }`, () => {
			const props = { children: generator.word(), variant: 'terciary' };

			render( <Circular { ...props } /> );
			const component = screen.getByTestId( 'cb-circular-spinner' );

			expect( component ).toBeTruthy();
			expect( component ).toHaveClass( '-terciary' );
		} );
	} );
} );
