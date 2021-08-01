import React from 'react';
import { composeStories } from '@storybook/testing-react';

import { render, screen } from 'test/helpers';
import { Variant } from './input';
import * as stories from './input.stories';
import generator from 'test/data-generator';

const { Playground } = composeStories( stories );

describe( 'Input', () => {
	it( 'renders correctly', () => {
		const props = {
			type: 'text',
		};

		render( <Playground { ...props } /> );
		const component = screen.getByTestId( 'cb-input' );

		expect( component ).toBeTruthy();

		expect( component ).toHaveAttribute( 'type', props.type );
	} );

	it( 'renders type correctly', () => {
		const props = {
			type: generator.pick( [
				'button',
				'color',
				'date',
				'datetime-local',
				'email',
				'file',
				'hidden',
				'image',
				'month',
				'number',
				'password',
				'range',
				'reset',
				'search',
				'submit',
				'tel',
				'text',
				'time',
				'url',
				'week',
			] ),
		};

		render( <Playground { ...props } /> );
		const component = screen.getByTestId( 'cb-input' );

		expect( component ).toBeTruthy();
		expect( component ).toHaveAttribute( 'type', props.type );
	} );

	describe( 'with variant', () => {
		it( `renders correctly with variant ${ Variant.danger }`, () => {
			const props = {
				type: 'text',
				variant: Variant.danger,
			};

			render( <Playground { ...props } /> );
			const component = screen.getByTestId( 'cb-input' );

			expect( component ).toBeTruthy();
			expect( component ).toHaveClass( '-danger' );
		} );

		it( `renders correctly with variant ${ Variant.info }`, () => {
			const props = {
				type: 'text',
				variant: Variant.info,
			};

			render( <Playground { ...props } /> );
			const component = screen.getByTestId( 'cb-input' );

			expect( component ).toBeTruthy();
			expect( component ).toHaveClass( '-info' );
		} );

		it( `renders correctly with variant ${ Variant.success }`, () => {
			const props = {
				type: 'text',
				variant: Variant.success,
			};

			render( <Playground { ...props } /> );
			const component = screen.getByTestId( 'cb-input' );

			expect( component ).toBeTruthy();
			expect( component ).toHaveClass( '-success' );
		} );

		it( `renders correctly with variant ${ Variant.warn }`, () => {
			const props = {
				type: 'text',
				variant: Variant.warn,
			};

			render( <Playground { ...props } /> );
			const component = screen.getByTestId( 'cb-input' );

			expect( component ).toBeTruthy();
			expect( component ).toHaveClass( '-warn' );
		} );
	} );
} );
