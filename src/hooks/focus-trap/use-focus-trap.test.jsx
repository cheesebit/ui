import React from 'react';
import { fireEvent, render, screen, userEvent } from 'test/helpers';
import { composeStories } from '@storybook/testing-react';

import * as stories from './use-focus-trap.stories';

const { Playground } = composeStories( stories );

const setup = ( props ) => render( <Playground { ...props } /> );

describe( 'useFocusTrap', () => {
	it( 'focus on all elements when the trap is deactivated', () => {
		const props = {};

		setup( props );

		screen.getByText( 'Trap is inactive' );

		userEvent.tab();
		expect( screen.getByText( '1' ) ).toHaveFocus();

		userEvent.tab();
		expect( screen.getByText( '2' ) ).toHaveFocus();

		userEvent.tab();
		expect( screen.getByText( '3' ) ).toHaveFocus();

		userEvent.tab();
		expect( screen.getByText( 'Activate' ) ).toHaveFocus();
	} );

	it( 'calls `onActivate` when the trap is activated', () => {
		const props = {
			onActivate: jest.fn(),
		};

		setup( props );

		fireEvent.click( screen.getByText( 'Activate' ) );

		expect( props.onActivate ).toHaveBeenCalled();
	} );

	it( 'focus on all focusable elements [currently supported] inside the container when the trap is activated', () => {
		const props = {};

		setup( props );

		fireEvent.click( screen.getByText( 'Activate' ) );

		screen.getByText( 'Trap is active' );

		userEvent.tab();
		expect( screen.getByText( '1' ) ).toHaveFocus();

		userEvent.tab();
		expect( screen.getByText( '2' ) ).toHaveFocus();

		userEvent.tab();
		expect( screen.getByText( '3' ) ).toHaveFocus();

		// it circles back to the first focusable element
		userEvent.tab();
		expect( screen.getByText( '1' ) ).toHaveFocus();

		userEvent.tab();
		expect( screen.getByText( '2' ) ).toHaveFocus();

		userEvent.tab();
		expect( screen.getByText( '3' ) ).toHaveFocus();

		fireEvent.click( screen.getByText( 'Deactivate' ) );

		// returns to the normal tab sequence
		userEvent.tab();
		expect( screen.getByText( 'Activate' ) ).toHaveFocus();
	} );

	it( 'focus with custom keys on all focusable elements [currently supported] inside the container when the trap is activated', () => {
		const props = {
			keys: [ 'ARROW_UP', 'ARROW_DOWN' ],
		};

		setup( props );

		fireEvent.click( screen.getByText( 'Activate' ) );

		screen.getByText( 'Trap is active' );

		userEvent.tab();

		expect( screen.getByText( '1' ) ).toHaveFocus();

		fireEvent.keyDown( document, { key: 'ArrowUp', code: 'ArrowUp' } );
		expect( screen.getByText( '3' ) ).toHaveFocus();

		fireEvent.keyDown( document, { key: 'ArrowUp', code: 'ArrowUp' } );
		expect( screen.getByText( '2' ) ).toHaveFocus();

		// it circles back to the first focusable element
		fireEvent.keyDown( document, { key: 'ArrowUp', code: 'ArrowUp' } );
		expect( screen.getByText( '1' ) ).toHaveFocus();

		fireEvent.keyDown( document, { key: 'ArrowUp', code: 'ArrowUp' } );
		expect( screen.getByText( '3' ) ).toHaveFocus();

		fireEvent.click( screen.getByText( 'Deactivate' ) );

		fireEvent.keyDown( document, { key: 'ArrowUp', code: 'ArrowUp' } );
		// keeps focus where it was before
		expect( screen.getByText( '3' ) ).toHaveFocus();
	} );

	it( 'calls `onDeactivate` when the trap is deactivated', () => {
		const props = {
			onDeactivate: jest.fn(),
		};

		setup( props );

		fireEvent.click( screen.getByText( 'Activate' ) );
		fireEvent.click( screen.getByText( 'Deactivate' ) );

		expect( props.onDeactivate ).toHaveBeenCalled();
	} );
} );
