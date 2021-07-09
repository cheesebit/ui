import React from 'react';

import { Input, Variant } from './index';
import { render } from '../../../test/helpers';
import generator from '../../../test/data-generator';

describe( 'Input', () => {
	it( 'renders correctly', () => {
		const props = {
			type: 'text',
		};

		const { getByTestId } = render( <Input { ...props } /> );
		const component = getByTestId( 'cb-input' );

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

		const { getByTestId } = render( <Input { ...props } /> );
		const component = getByTestId( 'cb-input' );

		expect( component ).toBeTruthy();
		expect( component ).toHaveAttribute( 'type', props.type );
	} );

	describe( 'with variant', () => {
		it( `renders correctly with variant ${ Variant.danger }`, () => {
			const props = {
				type: 'text',
				variant: Variant.danger,
			};

			const { getByTestId } = render( <Input { ...props } /> );
			const component = getByTestId( 'cb-input' );

			expect( component ).toBeTruthy();
			expect( component ).toHaveClass( '-danger' );
		} );

		it( `renders correctly with variant ${ Variant.info }`, () => {
			const props = {
				type: 'text',
				variant: Variant.info,
			};

			const { getByTestId } = render( <Input { ...props } /> );
			const component = getByTestId( 'cb-input' );

			expect( component ).toBeTruthy();
			expect( component ).toHaveClass( '-info' );
		} );

		it( `renders correctly with variant ${ Variant.success }`, () => {
			const props = {
				type: 'text',
				variant: Variant.success,
			};

			const { getByTestId } = render( <Input { ...props } /> );
			const component = getByTestId( 'cb-input' );

			expect( component ).toBeTruthy();
			expect( component ).toHaveClass( '-success' );
		} );

		it( `renders correctly with variant ${ Variant.warn }`, () => {
			const props = {
				type: 'text',
				variant: Variant.warn,
			};

			const { getByTestId } = render( <Input { ...props } /> );
			const component = getByTestId( 'cb-input' );

			expect( component ).toBeTruthy();
			expect( component ).toHaveClass( '-warn' );
		} );
	} );
} );
