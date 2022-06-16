import React from 'react';

import { Image } from './index';
import { screen, render } from '../../../test/helpers';
import generator from '../../../test/data-generator';

const generateSrc = () =>
	`https://via.placeholder.com/${ generator.natural( {
		min: 100,
		max: 150,
	} ) }`;

describe( 'Image', () => {
	it( 'renders correctly', () => {
		const props = {
			src: generateSrc(),
			onLoad: jest.fn(),
			onError: jest.fn(),
		};

		render( <Image { ...props } /> );
		const component = screen.getByTestId( 'cb-image' );

		expect( component ).toBeTruthy();
		expect( component ).not.toHaveAttribute( 'src' );
	} );
} );
