import React from 'react';

import { render, fireEvent } from '../../../test/helpers';
import { Switch } from './index';
import generator from '../../../test/data-generator';

describe( 'Switch', () => {
	const props = {
		children: generator.word(),
		onChange: jest.fn(),
	};

	const { getByTestId } = render( <Switch { ...props } /> );

	const component = getByTestId( 'cb-switch' );
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
