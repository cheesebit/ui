import React from 'react';
import { composeStories } from '@storybook/testing-react';

import { Icon } from 'atoms/icon';
import { render, screen } from 'test/helpers';
import * as stories from './dropdown.stories';
import generator from 'test/data-generator';

const { Playground } = composeStories( stories );

// TODO: this definitely should be properly tested

describe( 'Dropdown', () => {
	describe( 'default', () => {
		const props = {
			toggle: <Icon name="turned-in" size={ 12 } />,
			items: generator.array( () => {
				return {
					id: generator.id(),
					label: generator.word(),
					icon: 'bell',
					onClick: jest.fn(),
				};
			}, generator.natural( { min: 3, max: 10 } ) ),
			header: generator.word(),
			footer: generator.word(),
		};

		render( <Playground { ...props } /> );

		const component = screen.getByTestId( 'cb-dropdown' );
		const trigger = screen.getByTestId( 'trigger' );
		const items = screen.getByTestId( 'items' );

		it( 'renders correctly', () => {
			expect( component ).toBeTruthy();
			expect( trigger ).toBeTruthy();
			expect( items ).toBeTruthy();
		} );

		it( 'renders items correctly', () => {
			expect( items ).toBeTruthy();
			// expect( screen.getAllByTestId( 'item' ) ).toHaveLength( props.items.length );
		} );
	} );

	describe( 'custom parts', () => {} );
} );
