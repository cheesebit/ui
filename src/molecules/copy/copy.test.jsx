import React from 'react';
import { composeStories } from '@storybook/testing-react';

import { render, screen, userEvent } from 'test/helpers';
import * as stories from './copy.stories';
import generator from 'test/data-generator';

const { Playground } = composeStories(stories);

describe('Copy', () => {
	it('renders correctly', () => {
		const props = {
			value: generator.animal(),
		};

		render(<Playground {...props} />);

		expect(screen.getByTestId('cb-copy-button')).toBeTruthy();
		expect(screen.getByTestId('cb-input')).toBeTruthy();
	});

	it('copies content', () => {
		document.execCommand = jest.fn();

		const props = {
			value: generator.animal(),
			onCopy: jest.fn(),
		};

		render(<Playground {...props} />);

		userEvent.click(screen.getByTestId('cb-copy-button'));

		expect(document.execCommand).toHaveBeenCalledWith('copy');
	});

	// TODO: test paste
});
