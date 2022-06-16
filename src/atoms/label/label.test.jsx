import React from 'react';
import { composeStories } from '@storybook/testing-react';

import { render, screen } from 'test/helpers';
import * as stories from './label.stories';
import generator from 'test/data-generator';

const { Playground } = composeStories( stories );

describe( '<Label />', () => {
	it( 'renders correctly', () => {
		const props = { children: generator.word() };

		render( <Playground { ...props } /> );

		const component = screen.getByTestId( 'cb-label' );
		expect( component ).toBeTruthy();
	} );

	it( 'renders label correctly', () => {
		const props = { children: generator.word() };

		render( <Playground { ...props } /> );

		const label = screen.getByTestId( 'cb-label' );

		expect( label ).toHaveTextContent( props.children );
	} );

	describe( 'with variant', () => {
		it( `renders correctly with variant danger`, () => {
			const props = {
				label: generator.word(),
				children: generator.word(),
				variant: 'danger',
			};

			render( <Playground { ...props } /> );

			const component = screen.getByTestId( 'cb-label' );
			expect( component ).toHaveClass( '-danger' );
		} );

		it( `renders correctly with variant info`, () => {
			const props = {
				label: generator.word(),
				children: generator.word(),
				variant: 'info',
			};

			render( <Playground { ...props } /> );

			const component = screen.getByTestId( 'cb-label' );
			expect( component ).toHaveClass( '-info' );
		} );

		it( `renders correctly with variant success`, () => {
			const props = {
				label: generator.word(),
				children: generator.word(),
				variant: 'success',
			};

			render( <Playground { ...props } /> );

			const component = screen.getByTestId( 'cb-label' );
			expect( component ).toHaveClass( '-success' );
		} );

		it( `renders correctly with variant warn`, () => {
			const props = {
				label: generator.word(),
				children: generator.word(),
				variant: 'warn',
			};

			render( <Playground { ...props } /> );

			const component = screen.getByTestId( 'cb-label' );
			expect( component ).toHaveClass( '-warn' );
		} );
	} );
} );
