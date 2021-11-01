import generator from 'test/data-generator';
import { createSelectionStrategy } from './selection-strategy';

/** @type {SelectionAdapter} */
const adapter = {
	getID(o) {
		return o.id;
	},
};

/** @type {Record<string, SelectionAdapter>} */
const adapters = {
	test: adapter,
};

describe('SelectionStrategy', () => {
	describe('createSelectionStrategy', () => {
		it('returns a single selection strategy', () => {
			const props = {
				adapters,
				type: 'single',
			};

			const result = createSelectionStrategy(props);
			expect(result.type()).toBe('single');
		});

		it('returns a multiple selection strategy', () => {
			const props = {
				adapters,
				type: 'multiple',
			};

			const result = createSelectionStrategy(props);
			expect(result.type()).toBe('multiple');
		});
	});

	describe('SingleSelectionStrategy', () => {
		const props = {
			adapters,
			type: 'single',
		};

		it('initializes with empty selection when no items are provided', () => {
			const strategy = createSelectionStrategy(props);

			const expectedSelection = new Map();

			expect(strategy.init([])).toEqual(expectedSelection);
		});

		it('returns correct selection when items array is provided to init', () => {
			const item = {
				_type: 'test',
				id: generator.id(),
				name: generator.name(),
			};

			const strategy = createSelectionStrategy(props);

			const expectedSelection = new Map().set(adapter.getID(item), item);

			expect(strategy.init([item])).toEqual(expectedSelection);
		});

		it('returns empty selection when no items is provided to select', () => {
			const strategy = createSelectionStrategy(props);

			const expectedSelection = new Map();

			expect(strategy.select([], new Map())).toEqual(expectedSelection);
		});

		it('selects correctly when a single item is provided', () => {
			const item = {
				_type: 'test',
				id: generator.id(),
				name: generator.name(),
			};

			const strategy = createSelectionStrategy(props);
			const expectedSelection = new Map().set(adapter.getID(item), item);

			expect(strategy.select([item], new Map())).toEqual(
				expectedSelection
			);
		});

		it('selects correctly when multiple items are provided (only first item is considered)', () => {
			const items = [
				{
					_type: 'test',
					id: generator.id(),
					name: generator.name(),
				},
				{
					_type: 'test',
					id: generator.id(),
					name: generator.name(),
				},
			];

			const strategy = createSelectionStrategy(props);
			const expectedSelection = new Map().set(
				adapter.getID(items[0]),
				items[0]
			);

			expect(strategy.select(items, new Map())).toEqual(
				expectedSelection
			);
		});

		it('keeps selection when no items is provided to unselect', () => {
			const item = {
				_type: 'test',
				id: generator.id(),
				name: generator.name(),
			};

			const strategy = createSelectionStrategy(props);

			const initialSelection = new Map().set(adapter.getID(item), item);
			const expectedSelection = initialSelection;

			expect(strategy.unselect([], initialSelection)).toEqual(
				expectedSelection
			);
		});

		it('unselects correctly the provided items keys', () => {
			const item = {
				_type: 'test',
				id: generator.id(),
				name: generator.name(),
			};

			const strategy = createSelectionStrategy(props);

			const initialSelection = new Map().set(adapter.getID(item), item);

			const expectedSelection = new Map();

			expect(
				strategy.unselect([adapter.getID(item)], initialSelection)
			).toEqual(expectedSelection);
		});

		it('toggles correctly the provided items that are selected', () => {
			const item = {
				_type: 'test',
				id: generator.id(),
				name: generator.name(),
			};

			const strategy = createSelectionStrategy(props);

			const initialSelection = new Map().set(adapter.getID(item), item);

			const expectedSelection = new Map();

			expect(strategy.toggle([item], initialSelection)).toEqual(
				expectedSelection
			);
		});

		it('toggles correctly the provided items that are not selected', () => {
			const item = {
				_type: 'test',
				id: generator.id(),
				name: generator.name(),
			};

			const strategy = createSelectionStrategy(props);

			const initialSelection = new Map();
			const expectedSelection = new Map().set(adapter.getID(item), item);

			expect(strategy.toggle([item], initialSelection)).toEqual(
				expectedSelection
			);
		});

		it('returns empty selection correctly', () => {
			const item = {
				_type: 'test',
				id: generator.id(),
				name: generator.name(),
			};

			const strategy = createSelectionStrategy(props);

			const initialSelection = new Map().set(adapter.getID(item), item);

			const expectedSelection = new Map();

			expect(strategy.clear(initialSelection)).toEqual(expectedSelection);
		});
	});

	describe('MultipleSelectionStrategy', () => {
		const props = {
			adapters,
			type: 'multiple',
		};

		it('initializes with empty selection when no items are provided', () => {
			const strategy = createSelectionStrategy(props);

			const expectedSelection = new Map();

			expect(strategy.init([])).toEqual(expectedSelection);
		});

		it('initializes correctly when items array is provided', () => {
			const items = [
				{
					_type: 'test',
					id: generator.id(),
					name: generator.name(),
				},
				{
					_type: 'test',
					id: generator.id(),
					name: generator.name(),
				},
			];

			const strategy = createSelectionStrategy(props);
			const expectedSelection = new Map()
				.set(adapter.getID(items[0]), items[0])
				.set(adapter.getID(items[1]), items[1]);

			expect(strategy.init(items)).toEqual(expectedSelection);
		});

		it('returns empty selection when no items is provided to select', () => {
			const strategy = createSelectionStrategy(props);

			const expectedSelection = new Map();

			expect(strategy.select([], new Map())).toEqual(expectedSelection);
		});

		it('selects correctly when a single item is provided', () => {
			const items = [
				{
					_type: 'test',
					id: generator.id(),
					name: generator.name(),
				},
				{
					_type: 'test',
					id: generator.id(),
					name: generator.name(),
				},
			];

			const strategy = createSelectionStrategy(props);
			const expectedSelection = new Map().set(
				adapter.getID(items[0]),
				items[0]
			);

			expect(strategy.select([items[0]], new Map())).toEqual(
				expectedSelection
			);
		});

		it('selects correctly when multiple items are provided', () => {
			const items = [
				{
					_type: 'test',
					id: generator.id(),
					name: generator.name(),
				},
				{
					_type: 'test',
					id: generator.id(),
					name: generator.name(),
				},
			];

			const strategy = createSelectionStrategy(props);
			const expectedSelection = new Map()
				.set(adapter.getID(items[0]), items[0])
				.set(adapter.getID(items[1]), items[1]);

			expect(strategy.select(items, new Map())).toEqual(
				expectedSelection
			);
		});

		it('keeps selection when no items is provided to unselect', () => {
			const items = [
				{
					_type: 'test',
					id: generator.id(),
					name: generator.name(),
				},
				{
					_type: 'test',
					id: generator.id(),
					name: generator.name(),
				},
			];

			const strategy = createSelectionStrategy(props);
			const initialSelection = new Map()
				.set(adapter.getID(items[0]), items[0])
				.set(adapter.getID(items[1]), items[1]);

			const expectedSelection = initialSelection;

			expect(strategy.unselect([], initialSelection)).toEqual(
				expectedSelection
			);
		});

		it('unselects correctly the provided items keys', () => {
			const items = [
				{
					_type: 'test',
					id: generator.id(),
					name: generator.name(),
				},
				{
					_type: 'test',
					id: generator.id(),
					name: generator.name(),
				},
			];

			const strategy = createSelectionStrategy(props);
			const initialSelection = new Map()
				.set(adapter.getID(items[0]), items[0])
				.set(adapter.getID(items[1]), items[1]);

			const expectedSelection = new Map();

			expect(
				strategy.unselect(
					[adapter.getID(items[0]), adapter.getID(items[1])],
					initialSelection
				)
			).toEqual(expectedSelection);
		});

		it('toggles correctly the provided items that are selected', () => {
			const items = [
				{
					_type: 'test',
					id: generator.id(),
					name: generator.name(),
				},
				{
					_type: 'test',
					id: generator.id(),
					name: generator.name(),
				},
			];

			const strategy = createSelectionStrategy(props);
			const initialSelection = new Map()
				.set(adapter.getID(items[0]), items[0])
				.set(adapter.getID(items[1]), items[1]);

			const expectedSelection = new Map();

			expect(strategy.toggle(items, initialSelection)).toEqual(
				expectedSelection
			);
		});

		it('toggles correctly the provided items that are not selected', () => {
			const items = [
				{
					_type: 'test',
					id: generator.id(),
					name: generator.name(),
				},
				{
					_type: 'test',
					id: generator.id(),
					name: generator.name(),
				},
			];

			const strategy = createSelectionStrategy(props);

			const initialSelection = new Map();
			const expectedSelection = new Map()
				.set(adapter.getID(items[0]), items[0])
				.set(adapter.getID(items[1]), items[1]);

			expect(strategy.toggle(items, initialSelection)).toEqual(
				expectedSelection
			);
		});

		it('returns empty selection correctly', () => {
			const item = {
				_type: 'test',
				id: generator.id(),
				name: generator.name(),
			};

			const strategy = createSelectionStrategy(props);

			const initialSelection = new Map().set(adapter.getID(item), item);

			const expectedSelection = new Map();

			expect(strategy.clear(initialSelection)).toEqual(expectedSelection);
		});
	});
});

/** @typedef {import('./selection-strategy').SelectionAdapter} SelectionAdapter */
