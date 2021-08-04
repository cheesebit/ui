import React from 'react';
import { composeStories } from '@storybook/testing-react';

import { generateTabs } from './tabs.fixtures';
import { screen, render, userEvent } from 'test/helpers';
import * as stories from './tabs.stories';
import generator from 'test/data-generator';

const { Playground } = composeStories( stories );

describe( 'Tabs', () => {
	describe( 'default', () => {
		const tabs = generateTabs( { min: 2, max: 10 } );

		it( 'renders correctly', () => {
			const props = {
				items: tabs,
			};

			render( <Playground { ...props } /> );

			const component = screen.getByTestId( 'cb-tabs' );
			const activeIndicator = screen.getByTestId( 'active-indicator' );

			expect( component ).toBeTruthy();
			expect( activeIndicator ).toBeTruthy();
		} );

		it( 'renders all the individual tabs', () => {
			const props = {
				items: tabs,
			};

			const { getAllByRole } = render( <Playground { ...props } /> );

			expect( getAllByRole( 'tab' ) ).toHaveLength( tabs.length );
		} );

		it( 'sets tab as active on tab click', () => {
			const props = {
				items: tabs,
			};

			const { getAllByRole } = render( <Playground { ...props } /> );

			const tabComponents = getAllByRole( 'tab' );
			const at = generator.natural( { min: 0, max: tabs.length - 1 } );

			userEvent.click( tabComponents[ at ] );
			expect( tabComponents[ at ] ).toHaveClass( 'is-active' );
		} );

		// it( 'renders children as function', () => {
		// 	const props = {
		// 		id: generator.id(),
		// 		active: generator.bool(),
		// 		children: jest.fn(),
		// 	};

		// 	const { getByRole } = render( <Tab { ...props } /> );
		// 	const component = getByRole( 'tab' );

		// 	expect( component ).toBeTruthy();
		// 	expect( props.children ).toHaveBeenCalledWith( {
		// 		id: props.id,
		// 		active: props.active,
		// 	} );
		// } );
	} );

	describe( 'overflow tabs to dropdown', () => {
		const amount = generator.natural( { min: 10, max: 15 } );

		const tabs = generator.array( () => {
			return {
				id: generator.id(),
				label: generator.word( { length: 10 } ),
			};
		}, amount );

		const props = {
			items: tabs,
		};

		it( `renders a dropdown`, () => {
			render( <Playground { ...props } /> );

			const component = screen.getByTestId( 'cb-tabs' );
			const dropdown = screen.getByTestId( 'cb-dropdown' );

			expect( component ).toBeTruthy();
			expect( dropdown ).toBeTruthy();
		} );

		// TODO: test amount of tabs and dropdown items
	} );
} );
