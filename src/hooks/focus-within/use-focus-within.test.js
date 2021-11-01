import React from 'react';
import { screen, render, fireEvent as fire } from 'test/helpers';

import useFocusWithin from './use-focus-within';

function Experiment(props) {
	const { ref } = useFocusWithin(props);

	return (
		<div>
			<div ref={ref}>
				<button>Focusable</button>
			</div>
			<button>Ignorable</button>
		</div>
	);
}

const setup = (props) => render(<Experiment {...props} />);

describe('useFocusWithin', () => {
	it('calls onFocus when a descendant is focused', () => {
		const props = {
			onFocus: jest.fn(),
			onBlur: jest.fn(),
		};

		setup(props);

		fire.focus(screen.getByText('Focusable'));
		expect(props.onFocus).toHaveBeenCalled();
	});

	it('does not call onFocus when a non-descendant is focused', () => {
		const props = {
			onFocus: jest.fn(),
			onBlur: jest.fn(),
		};

		setup(props);

		fire.focus(screen.getByText('Ignorable'));
		expect(props.onFocus).not.toHaveBeenCalled();
	});

	it('calls onBlur when a descendant loses focus', () => {
		const props = {
			onFocus: jest.fn(),
			onBlur: jest.fn(),
		};

		setup(props);

		fire.blur(screen.getByText('Focusable'));
		expect(props.onBlur).toHaveBeenCalled();
	});

	it('does not call onBlur when a non-descendant loses focus', () => {
		const props = {
			onFocus: jest.fn(),
			onBlur: jest.fn(),
		};

		setup(props);

		fire.blur(screen.getByText('Ignorable'));
		expect(props.onBlur).not.toHaveBeenCalled();
	});
});
