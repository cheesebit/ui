import get from 'lodash.get';

import { keys } from '../toolset';
import adapter from './adapter';
import Tree from './tree';

import generator from '../../../test/data-generator';

/** @type {Item[]} */
const items = [
	{
		label: 'label-1',
		value: '0',
		options: [
			{
				label: 'label-11',
				value: '0.options[0]',
				options: [
					{
						label: 'label-111',
						value: '0.options[0].options[0]',
					},
					{
						label: 'label-112',
						value: '0.options[0].options[1]',
					},
				],
			},
			{
				label: 'label-12',
				value: '0.options[1]',
				options: [
					{
						label: 'label-121',
						value: '0.options[1].options[0]',
					},
					{
						label: 'label-122',
						value: '0.options[1].options[1]',
					},
				],
			},
		],
	},
];

const ids = [
	'0',
	'0.options[0]',
	'0.options[0].options[0]',
	'0.options[0].options[1]',
	'0.options[1]',
	'0.options[1].options[0]',
	'0.options[1].options[1]',
];

describe('Tree', () => {
	describe('with default adapter', () => {
		const tree = new Tree(adapter, items);

		it('contains all values in the mapping object', () => {
			const { children } = tree.getRoot();
			for (const id of children) {
				expect(ids).toContain(id);
			}
		});

		it('contains the ROOT node', () => {
			expect(keys(tree.mapping)).toContain(Tree.ROOT);
		});

		it('should return the ROOT node when `getRoot` is called', () => {
			expect(tree.getRoot()).toEqual({
				id: Tree.ROOT,
				node: null,
				parent: null,
				children: items.map(adapter.getID),
			});
		});

		it('should return the correct node when `getNode` is called', () => {
			const nodeID = generator.pick(ids);

			expect(tree.getNode(nodeID)).toMatchObject({
				id: nodeID,
				node: get(items, nodeID, null),
			});
		});

		it('should return the correct children node when `getChildrenOf` is called', () => {
			ids.forEach((nodeID) => {
				const node = get(items, nodeID, null);
				const expectedChildren = (adapter.getChildren(node) || []).map(
					adapter.getID
				);

				expect(tree.getChildrenOf(nodeID)).toEqual(
					expect.arrayContaining(expectedChildren)
				);
			});
		});

		it('should return the correct parent when `getParentOf` is called', () => {
			ids.forEach((id) => {
				const parent = tree.getParentOf(id);

				expect(tree.getChildrenOf(parent)).toContain(id);
			});
		});
	});

	// TODO
	describe('with custom adapter', () => {});
});

/**
 * @template T
 * @typedef {import('./tree').TreeNode<T>} TreeNode<T>
 */

/**
 * @typedef {import('./adapter').DefaultAdapter} DefaultAdapter
 * @typedef {import('./adapter').TreeAdapter} TreeAdapter
 * @typedef {import('./adapter').Item} Item
 */
