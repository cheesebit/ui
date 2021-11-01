import React from 'react';
import { composeStories } from '@storybook/testing-react';

import { render, screen } from 'test/helpers';
import * as stories from './tooltip.stories';
import generator from 'test/data-generator';

const { Playground } = composeStories(stories);

describe('<Tooltip />', () => {
	it('renders untouched children if no title is provided', () => {
		const props = {
			text: null,
			children: <span>{generator.word()}</span>,
		};

		render(<Playground {...props} />);

		screen.queryByTestId('cb-tooltip');
	});

	it('renders correctly with title prop', () => {
		const props = {
			text: generator.sentence(),
			children: <span>{generator.word()}</span>,
		};

		render(<Playground {...props} />);
		const component = screen.getByTestId('cb-tooltip');

		expect(component).toHaveTextContent(props.text);
	});
});
