import React from 'react';
import { composeStories } from '@storybook/testing-react';

import { render, screen } from 'test/helpers';
import { Variant } from './spinner';
import * as stories from './spinner.stories';
import generator from 'test/data-generator';

const { Playground } = composeStories( stories );

describe( 'Spinner', () => {
	it( 'renders correctly', () => {
		const props = {
			children: generator.word(),
		};

		render( <Playground { ...props } /> );
		const component = screen.getByTestId( 'cb-spinner' );

		expect( component ).toBeTruthy();
		expect( component ).toHaveTextContent( props.children );
	} );

	describe( 'with variant', () => {
		it( `renders correctly with variant ${ Variant.primary }`, () => {
			const props = { children: generator.word(), variant: Variant.primary };

			render( <Playground { ...props } /> );
			const component = screen.getByTestId( 'cb-spinner' );

			expect( component ).toBeTruthy();
			expect( component ).toHaveClass( '-primary' );
		} );

		it( `renders correctly with variant ${ Variant.secondary }`, () => {
			const props = { children: generator.word(), variant: Variant.secondary };

			render( <Playground { ...props } /> );
			const component = screen.getByTestId( 'cb-spinner' );

			expect( component ).toBeTruthy();
			expect( component ).toHaveClass( '-secondary' );
		} );

		it( `renders correctly with variant ${ Variant.terciary }`, () => {
			const props = { children: generator.word(), variant: Variant.terciary };

			render( <Playground { ...props } /> );
			const component = screen.getByTestId( 'cb-spinner' );

			expect( component ).toBeTruthy();
			expect( component ).toHaveClass( '-terciary' );
		} );
	} );
} );
