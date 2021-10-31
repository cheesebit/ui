import React from 'react';
import { screen, render, fireEvent as fire } from 'test/helpers';
import useClickOutside from './use-click-outside';

function Experiment({ callback, disabled }) {
	const ref = React.useRef(null);

	useClickOutside(ref, callback, disabled);

	return (
		<div>
			<div ref={ref}>
				<label htmlFor="inside-label">Inside</label>
				<input id="inside-label" />
			</div>
			<button>Outside</button>
		</div>
	);
}

const setup = (props) => render(<Experiment {...props} />);

describe('useClickOutside', () => {
	describe('when enabled', () => {
		const props = {
			callback: jest.fn(),
			disabled: false,
		};

		it('does not call callback if user has not interacted with container descendants', () => {
			setup(props);

			fire.mouseDown(screen.getByText('Outside'));
			fire.touchEnd(screen.getByText('Outside'));
			fire.keyUp(screen.getByText('Outside'), {
				key: 'Escape',
				code: 'Escape',
			});

			expect(props.callback).not.toHaveBeenCalled();
		});

		it('calls callback if the user has interacted with the mouse in any of the container descendants', () => {
			setup(props);

			fire.mouseDown(screen.getByLabelText('Inside'));
			fire.mouseDown(screen.getByText('Outside'));
			expect(props.callback).toHaveBeenCalled();
		});

		it('calls callback if the user has touched in any of the container descendants', () => {
			setup(props);

			fire.touchEnd(screen.getByLabelText('Inside'));
			fire.mouseDown(screen.getByText('Outside'));
			expect(props.callback).toHaveBeenCalled();
		});

		it('calls callback if the user has pressed any key in any of the container descendants', () => {
			setup(props);

			fire.keyUp(screen.getByLabelText('Inside'), {
				key: 'A',
				code: 'KeyA',
			});
			fire.mouseDown(screen.getByText('Outside'));
			expect(props.callback).toHaveBeenCalled();
		});

		it('calls callback if the user presses the escape key while interacting with any of the container descendants', () => {
			setup(props);

			fire.mouseDown(screen.getByLabelText('Inside'));
			fire.keyUp(screen.getByLabelText('Inside'), {
				key: 'Escape',
				code: 'Escape',
			});
			expect(props.callback).toHaveBeenCalled();
		});
	});

	describe('when disabled', () => {
		const props = {
			callback: jest.fn(),
			disabled: true,
		};

		it('does not call the callback even if the user has interacted with the mouse in any of the container descendants', () => {
			setup(props);

			fire.mouseDown(screen.getByLabelText('Inside'));
			fire.mouseDown(screen.getByText('Outside'));
			expect(props.callback).not.toHaveBeenCalled();
		});

		it('does not call callback even if the user has touched in any of the container descendants', () => {
			setup(props);

			fire.touchEnd(screen.getByLabelText('Inside'));
			fire.mouseDown(screen.getByText('Outside'));
			expect(props.callback).not.toHaveBeenCalled();
		});

		it('does not call callback even if the user has pressed any key in any of the container descendants', () => {
			setup(props);

			fire.keyUp(screen.getByLabelText('Inside'), {
				key: 'A',
				code: 'KeyA',
			});
			fire.mouseDown(screen.getByText('Outside'));
			expect(props.callback).not.toHaveBeenCalled();
		});

		it('does not call callback even if the user presses the escape key while interacting with any of the container descendants', () => {
			setup(props);

			fire.mouseDown(screen.getByLabelText('Inside'));
			fire.keyUp(screen.getByLabelText('Inside'), {
				key: 'Escape',
				code: 'Escape',
			});
			expect(props.callback).not.toHaveBeenCalled();
		});
	});
});
