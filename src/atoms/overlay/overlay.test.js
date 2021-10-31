import React from 'react';

import { Overlay } from './index';

import { render } from '../../../test/helpers';
import generator from '../../../test/data-generator';

describe('Overlay', () => {
	it('renders correctly', () => {
		const props = {
			children: generator.word(),
		};

		const { getByTestId } = render(<Overlay {...props} />);
		const component = getByTestId('cb-overlay');

		expect(component).toBeTruthy();
		expect(component).toHaveTextContent(props.children);
	});

	describe('with theme', () => {
		it(`renders correctly with theme light`, () => {
			const props = {
				children: generator.word(),
				/** @type {OverlayTheme} */
				theme: 'light',
			};

			const { getByTestId } = render(<Overlay {...props} />);
			const component = getByTestId('cb-overlay');

			expect(component).toBeTruthy();
			expect(component).toHaveClass('-light');
		});

		it(`renders correctly with themedark`, () => {
			const props = {
				children: generator.word(),
				/** @type {OverlayTheme} */
				theme: 'dark',
			};

			const { getByTestId } = render(<Overlay {...props} />);
			const component = getByTestId('cb-overlay');

			expect(component).toBeTruthy();
			expect(component).toHaveClass('-dark');
		});
	});
});

/**
 * @typedef {import('./overlay').OverlayTheme} OverlayTheme
 */
