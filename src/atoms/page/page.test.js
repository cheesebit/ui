import React from 'react';

import { Page } from './index';

import { screen, render } from 'test/helpers';
import generator from 'test/data-generator';

describe( 'Page', () => {
	it( 'renders correctly', () => {
		const props = {
			children: generator.word(),
		};

		render( <Page { ...props } /> );
		const component = screen.getByTestId( 'cb-page' );

		expect( component ).toBeTruthy();
		expect( component ).toHaveTextContent( props.children );
	} );

	it( 'renders header correctly', () => {
		const props = {
			children: generator.sentence(),
		};

		render( <Page.Header { ...props } /> );
		const component = screen.getByText( props.children );

		expect( component ).toBeTruthy();
	} );

	it( 'renders body correctly', () => {
		const props = {
			children: generator.sentence(),
		};

		render( <Page.Body { ...props } /> );
		const component = screen.getByText( props.children );

		expect( component ).toBeTruthy();
	} );
} );
