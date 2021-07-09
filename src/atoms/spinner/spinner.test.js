import React from 'react';

import { render } from '../../../test/helpers';
import { Spinner, Variant } from './index';
import generator from '../../../test/data-generator';

describe( 'Spinner', () => {
	it( 'renders correctly', () => {
		const props = {
			children: generator.word(),
		};

		const { getByTestId } = render( <Spinner { ...props } /> );
		const component = getByTestId( 'cb-spinner' );

		expect( component ).toBeTruthy();
		expect( component ).toHaveTextContent( props.children );
	} );

	describe( 'with variant', () => {
		it( `renders correctly with variant ${ Variant.primary }`, () => {
			const props = { children: generator.word(), variant: Variant.primary };

			const { getByTestId } = render( <Spinner { ...props } /> );
			const component = getByTestId( 'cb-spinner' );

			expect( component ).toBeTruthy();
			expect( component ).toHaveClass( '-primary' );
		} );

		it( `renders correctly with variant ${ Variant.secondary }`, () => {
			const props = { children: generator.word(), variant: Variant.secondary };

			const { getByTestId } = render( <Spinner { ...props } /> );
			const component = getByTestId( 'cb-spinner' );

			expect( component ).toBeTruthy();
			expect( component ).toHaveClass( '-secondary' );
		} );

		it( `renders correctly with variant ${ Variant.terciary }`, () => {
			const props = { children: generator.word(), variant: Variant.terciary };

			const { getByTestId } = render( <Spinner { ...props } /> );
			const component = getByTestId( 'cb-spinner' );

			expect( component ).toBeTruthy();
			expect( component ).toHaveClass( '-terciary' );
		} );
	} );
} );
