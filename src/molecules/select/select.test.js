import React from 'react';
import { composeStories } from '@storybook/testing-react';

import { render, screen, userEvent } from 'test/helpers';
import * as stories from './select.stories';
import generator from 'test/data-generator';

const { Playground } = composeStories( stories );

describe( 'Select', () => {
	it( 'renders correctly', () => {
		const props = {
			options: generator.array( () => ( {
				label: generator.name(),
				value: generator.id(),
			} ) ),
		};

		render( <Playground { ...props } /> );
		const component = screen.getByTestId( 'cb-select' );

		const options = screen.getAllByTestId( 'option' );
		expect( component ).toBeTruthy();
		expect( options ).toHaveLength( props.options.length );
	} );

	it( 'sets as selected when an option is clicked', () => {
		const props = {
			options: generator.array( () => ( {
				label: generator.name(),
				value: generator.id(),
			} ) ),
		};

		render( <Playground { ...props } /> );

		const option = generator.pick( props.options );

		userEvent.click( screen.getByText( option.label ) );

		expect( screen.getByTestId( 'toggle' ) ).toHaveValue( option.label );
	} );
} );
