import React from 'react';
import { composeStories } from '@storybook/testing-react';

import { render, screen } from 'test/helpers';
import * as stories from './link.stories';
import generator from 'test/data-generator';

const { Playground } = composeStories(stories);

describe('Link', () => {
	describe('default', () => {
		it('renders correctly', () => {
			const props = {
				href: generator.url(),
				title: generator.sentence(),
				children: generator.word(),
				target: generator.pick(['_self', '_blank', '_parent', '_top']),
			};

			render(<Playground {...props} />);

			const component = screen.getByTitle(props.title);

			expect(component).toBeTruthy();
			expect(component).toHaveAttribute('href', props.href);
			expect(component).toHaveAttribute('title', props.title);
			expect(component).toHaveAttribute('target', props.target);
			expect(component).toHaveTextContent(props.children);
		});

		it(`adds noreferrer to anchor element rel attribute`, () => {
			const props = {
				href: generator.url(),
				alt: generator.sentence(),
				title: generator.sentence(),
				children: generator.word(),
				target: generator.pick(['_self', '_blank', '_parent', '_top']),
			};

			render(<Playground {...props} />);

			const component = screen.getByTestId('cb-link');

			expect(component.getAttribute('rel').includes('noreferrer')).toBe(
				true
			);
		});

		it('sets aria-label as the provided title prop', () => {
			const props = {
				href: generator.url(),
				title: generator.sentence(),
				children: generator.word(),
				target: generator.pick(['_self', '_blank', '_parent', '_top']),
			};

			render(<Playground {...props} />);

			const component = screen.getByTitle(props.title);

			expect(component).toHaveAttribute('aria-label', props.alt);
		});

		it('renders title prop as aria-label, if provided', () => {
			const props = {
				href: generator.url(),
				title: generator.sentence(),
			};

			render(<Playground {...props} />);

			expect(screen.getByLabelText(props.title)).toBeTruthy();
		});

		it('renders title prop as aria-label, if no alt is provided', () => {
			const props = {
				href: generator.url(),
				title: generator.sentence(),
			};

			render(<Playground {...props} />);

			expect(screen.getByLabelText(props.title)).toBeTruthy();
		});

		it(`renders _blank as target if none is provided`, () => {
			const props = {
				title: generator.sentence(),
			};

			render(<Playground {...props} />);
			const component = screen.getByTitle(props.title);

			expect(component).toBeTruthy();
			expect(component).toHaveAttribute('target', '_blank');
		});
	});

	describe('with sanitized props', () => {
		const props = {
			href: 'javascript:copySecureData()',
			title: generator.sentence(),
			children: generator.word(),
			target: '_blank',
		};

		render(<Playground {...props} />);
		const component = screen.getByTitle(props.title);

		it('removes the insecure href prop', () => {
			expect(component).not.toHaveAttribute('href');
		});

		it(`adds noopener to anchor element rel attribute, due to the target _blank`, () => {
			expect(component.getAttribute('rel').includes('noopener')).toBe(
				true
			);
		});
	});
});
