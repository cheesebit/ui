import React from 'react';

import { composeStories } from '@storybook/testing-react';

import { render, screen, fireEvent } from 'test/helpers';
import * as stories from './radio.stories';
import generator from 'test/data-generator';

const { Playground } = composeStories( stories );

describe( 'Radio', () => {
	const props = {
		children: generator.word(),
		onChange: jest.fn(),
	};

	const { getByTestId } = render( <Playground { ...props } /> );

	const component = screen.getByTestId( 'cb-radio' );
	const selector = getByTestId( 'selector' );

	it( 'renders correctly', () => {
		expect( component ).toHaveTextContent( props.children );
		expect( selector ).toHaveAttribute( 'type', 'radio' );
	} );

	it( 'triggers onChange when clicked', () => {
		expect( selector.checked ).toBe( false );
		fireEvent.click( selector );
		expect( selector.checked ).toBe( true );
	} );
} );
