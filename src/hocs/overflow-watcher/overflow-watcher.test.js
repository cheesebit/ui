// @ts-nocheck
import React from 'react';

import { mount } from 'test/helpers';
import generator from 'test/data-generator';
import OverflowWatcher from './overflow-watcher';

const WIDTH = 1024;

jest.mock('../resize-watcher/resize-watcher', () => {
	return jest.fn().mockImplementation(({ children }) => {
		return children({ width: WIDTH });
	});
});

describe('OverflowWatcher', () => {
	it('returns options correctly', () => {
		const props = {
			options: {
				add: () => 0,
			},
			children: () => (
				<div>
					<div>{generator.word()}</div>
					<div>{generator.word()}</div>
					<div>{generator.word()}</div>
				</div>
			),
			onUpdate: jest.fn(),
			selector: '',
		};

		const { instance } = mount(<OverflowWatcher {...props} />);

		expect(instance.options).toEqual(props.options);
	});

	it('returns empty options correctly', () => {
		const props = {
			children: () => (
				<div>
					<div>{generator.word()}</div>
					<div>{generator.word()}</div>
					<div>{generator.word()}</div>
				</div>
			),
			onUpdate: jest.fn(),
			selector: '',
		};

		const { instance } = mount(<OverflowWatcher {...props} />);

		expect(instance.options).toEqual({});
	});

	it('returns children correctly when ref is null/undefined', () => {
		const props = {
			from: generator.natural({ min: 1, max: 10 }),
			to: generator.natural({ min: 11, max: 20 }),
			children: () => <div />,
			onUpdate: jest.fn(),
			selector: '',
		};

		const { instance } = mount(<OverflowWatcher {...props} />);
		expect(
			instance.getChildren({
				ref: {
					current: null,
				},
			})
		).toEqual([]);
	});

	it('returns children correctly', () => {
		const props = {
			from: generator.natural({ min: 1, max: 10 }),
			to: generator.natural({ min: 11, max: 20 }),
			children: ({ from, to, width }) => (
				<div>
					<div data-testid="from-div">{from}</div>
					<div data-testid="to-div">{to}</div>
					<div data-testid="width-div">{width}</div>
				</div>
			),
			onUpdate: jest.fn(),
			selector: '',
		};

		const { instance } = mount(<OverflowWatcher {...props} />);
		const array = generator.pick([1, 2, 3, 45], {
			quantity: generator.natural({ min: 2, max: 5 }),
		});
		expect(
			instance.getChildren({
				ref: {
					current: {
						querySelectorAll: () => array,
					},
				},
			})
		).toEqual(array);

		// instance.getChildren({
		//   ref: {
		//     current: null,
		//   },
		// });
		// const params = {
		//   width: generator.natural(),
		//   ref: { current: null },
		// };
		// const props = {
		//   from: generator.natural({ min: 1, max: 10 }),
		//   to: generator.natural({ min: 11, max: 20 }),
		//   children: ({ from, to, width }) => (
		//     <div>
		//       <div data-testid="from-div">{from}</div>
		//       <div data-testid="to-div">{to}</div>
		//       <div data-testid="width-div">{width}</div>
		//     </div>
		//   ),
		//   onUpdate: jest.fn(),
		//   selector: '',
		// };
		// const { getByTestId } = mount(<OverflowWatcher {...props} />);
		// expect(getByTestId('from-div').text()).toBe(String(props.from));
		// expect(getByTestId('to-div').text()).toBe(String(props.to));
		// expect(getByTestId('width-div').text()).toBe(String(WIDTH));
	});

	it('calculates overflow correctly', () => {});
});
