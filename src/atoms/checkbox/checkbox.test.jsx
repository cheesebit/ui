import React from 'react';
import { composeStories } from '@storybook/testing-react';

import { render, screen, fireEvent } from 'test/helpers';
import * as stories from './checkbox.stories';
import generator from 'test/data-generator';

const { Playground } = composeStories( stories );

describe( 'Checkbox', () => {
	const props = {
		children: generator.word(),
		onChange: jest.fn(),
	};

	render( <Playground { ...props } /> );

	const component = screen.getByTestId( 'cb-checkbox' );
	/** @type {HTMLInputElement} */
	// @ts-ignore
	const selector = screen.getByTestId( 'selector' );

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
