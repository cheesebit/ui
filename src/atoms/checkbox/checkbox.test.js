import React from 'react';

import { render, fireEvent } from '../../../test/helpers';
import { Checkbox } from './index';
import generator from '../../../test/data-generator';

describe( 'Checkbox', () => {
	const props = {
		children: generator.word(),
		onChange: jest.fn(),
	};

	const { getByTestId } = render( <Checkbox { ...props } /> );

	const component = getByTestId( 'cb-checkbox' );
	const selector = getByTestId( 'selector' );

	it( 'renders correctly', () => {
		expect( component ).toHaveTextContent( props.children );
		expect( selector ).toHaveAttribute( 'type', 'checkbox' );
	} );

	it( 'triggers onChange when clicked', () => {
		expect( selector.checked ).toBe( false );
		fireEvent.click( selector );
		expect( selector.checked ).toBe( true );
	} );
} );
