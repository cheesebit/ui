import React from 'react';
import { composeStories } from '@storybook/testing-react';

import { render, screen, userEvent } from 'test/helpers';
import * as stories from './select.stories';
import generator from 'test/data-generator';

const { Playground } = composeStories(stories);

// TODO: this definitely should be properly tested
describe('Select', () => {
	it('renders correctly', () => {
		const props = {
			options: generator.array(
				() => ({
					label: generator.name(),
					value: generator.id(),
				}),
				4
			),
		};

		render(<Playground {...props} />);
		const component = screen.getByTestId('cb-select');
	});
});
