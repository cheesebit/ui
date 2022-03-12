import React from 'react';
import { composeStories } from '@storybook/testing-react';

import { render, screen } from 'test/helpers';
import * as stories from './list.stories';
import generator from 'test/data-generator';
import List from './list';

const { Playground } = composeStories(stories);

describe('List', () => {
	it('renders correctly', () => {
		const props = {
			children: generator.word(),
		};

		render(<Playground {...props} />);
		const component = screen.getByTestId('cb-list');

		expect(component).toBeTruthy();
		expect(component).toHaveTextContent(props.children);
	});

	it('renders bordered correctly', () => {
		const props = {
			children: generator.word(),
			bordered: true,
		};

		render(<Playground {...props} />);
		const component = screen.getByTestId('cb-list');

		expect(component).toHaveClass('-bordered');
	});

	it('renders hoverable correctly', () => {
		const props = {
			children: generator.word(),
			hoverable: true,
		};

		render(<Playground {...props} />);
		const component = screen.getByTestId('cb-list');

		expect(component).toHaveClass('-hoverable');
	});

	it('renders striped correctly', () => {
		const props = {
			children: generator.word(),
			striped: true,
		};

		render(<Playground {...props} />);
		const component = screen.getByTestId('cb-list');

		expect(component).toHaveClass('-striped');
	});

	it('render list item correctly', () => {
		const props = {
			children: generator.sentence(),
		};

		render(<List.Item {...props} />);
		const component = screen.getByTestId('list-item');

		expect(component).toBeTruthy();
	});

	it('render disabled list item correctly', () => {
		const props = {
			children: generator.sentence(),
			disabled: true,
		};

		render(<List.Item {...props} />);
		const component = screen.getByTestId('list-item');

		expect(component).toBeTruthy();
		expect(component).toHaveClass('is-disabled');
	});
});
