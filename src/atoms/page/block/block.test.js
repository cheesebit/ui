import React from 'react';

import Block from './block';

import { render } from '../../../../test/helpers';
import generator from '../../../../test/data-generator';

describe( 'Block', () => {
	it( 'renders correctly', () => {
		const props = {
			children: generator.paragraph(),
		};

		const { getByTestId } = render( <Block { ...props } /> );
		const component = getByTestId( 'cb-block' );

		expect( component ).toBeTruthy();
		expect( component ).toHaveTextContent( props.children );
	} );

	it( 'renders `main` correctly', () => {
		const props = {
			children: generator.paragraph(),
			main: true,
		};

		const { getByTestId } = render( <Block { ...props } /> );
		const component = getByTestId( 'cb-block' );

		expect( component ).toBeTruthy();
		expect( component ).toHaveClass( '-main' );
	} );
} );
