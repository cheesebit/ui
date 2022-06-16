import React from 'react';

import { composeStories } from '@storybook/testing-react';

import { keys } from 'common/toolset';
import { render, screen } from 'test/helpers';
import * as stories from './icon.stories';
import generator from 'test/data-generator';
import mapping from './icon-mapping';

const { Playground } = composeStories( stories );

describe( 'Icon', () => {
	it( 'renders correctly', () => {
		const props = {
			name: generator.pick( keys( mapping ) ),
		};

		render( <Playground { ...props } /> );
		const component = screen.getByLabelText( props.name );

		expect( component ).toBeTruthy();
	} );

	it( `renders an '?' when icon does not exist`, () => {
		const props = {
			name: generator.word(),
		};

		render( <Playground { ...props } /> );

		expect( screen.getByText( '?' ) ).toBeTruthy();
	} );
} );
