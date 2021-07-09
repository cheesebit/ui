import React from 'react';

import { render, userEvent } from 'test/helpers';
import { Copy } from './index';
import generator from 'test/data-generator';

describe( 'Copy', () => {
	it( 'renders correctly', () => {
		const props = {
			value: generator.animal(),
		};

		const { getByTestId } = render( <Copy { ...props } /> );

		expect( getByTestId( 'cb-copy-button' ) ).toBeTruthy();
		expect( getByTestId( 'cb-input' ) ).toBeTruthy();
	} );

	it( 'copies content', () => {
		document.execCommand = jest.fn();

		const props = {
			value: generator.animal(),
			onCopy: jest.fn(),
		};

		const { getByTestId } = render( <Copy { ...props } /> );

		userEvent.click( getByTestId( 'cb-copy-button' ) );

		expect( document.execCommand ).toHaveBeenCalledWith( 'copy' );
	} );

	// TODO: test paste
} );
