import get from 'lodash.get';

import { isEmpty, isNil, keys, mandatory, map, merge } from '../toolset';
import { DEFAULT } from '../constants';

const ROOT_ID = '*$+#_ROOT_#+$*';

/**
 * @param {TreeAdapter} adapter - tree adapter
 * @param {unknown} node - the node itself
 * @param {string} parent - parent ID
 * @return {Record<string, TreeNode<T>} the new tree
 */
function buildNode(adapter, node, parent) {
	const nodeID = adapter.getID(node);
	const children = adapter.getChildren(node) || DEFAULT.ARRAY;

	return merge(
		{
			[nodeID]: {
				id: nodeID,
				node,
				parent,
				children: map(adapter.getID, children),
			},
		},
		buildNodes(adapter, children, nodeID)
	);
}

/**
 * @param {TreeAdapter} adapter - tree adapter
 * @param {unknown[]} nodes - the node itself
 * @param {string} parentID - parent ID
 * @return {Record<string, TreeNode<T>} the new tree
 */
function buildNodes(adapter, nodes, parentID) {
	/** @type {Record<string, TreeNode<T>} */
	let tree = {};

	(nodes || DEFAULT.ARRAY).forEach((item) => {
		try {
			tree = merge(tree, buildNode(adapter, item, parentID));
		} catch (error) {
			// TODO: handle error
		}
	});

	return tree;
}

/**
 * @param {TreeAdapter} adapter - tree adapter
 * @param {unknown[]} nodes - the node itself
 * @return {Record<string, TreeNode<T>} the new tree
 */
function buildTree(adapter, nodes) {
	const children = buildNodes(adapter, nodes, ROOT_ID);

	if (isEmpty(children)) {
		return {};
	}

	/** @type {Record<string, TreeNode<T>} */
	const root = {
		...children,
		[ROOT_ID]: {
			id: ROOT_ID,
			node: null,
			parent: null,
			children: keys(children).filter(
				(childID) => children[childID].parent === ROOT_ID
			),
		},
	};

	return root;
}

class Tree {
	/**
	 * @param {TreeAdapter} adapter - tree adapter
	 * @param {unknown[]} nodes - array of nodes to be added to the tree
	 */
	constructor(adapter = mandatory('adapter is required'), nodes) {
		this._adapter = adapter;

		// calling setter to trigger buildTree
		this.mapping = nodes;
	}

	set mapping(nodes) {
		this._mapping = buildTree(this._adapter, nodes);
	}

	get mapping() {
		return this._mapping;
	}

	getRoot() {
		return this.getNode(ROOT_ID);
	}

	getNode(id) {
		const node = get(this._mapping, [id], null);

		return node;
	}

	getChildrenOf(id) {
		const node = this.getNode(id);

		if (isNil(node)) {
			return [];
		}

		return node.children || [];
	}

	getParentOf(id) {
		const node = this.getNode(id);

		if (isNil(node)) {
			return null;
		}

		return node.parent;
	}
}

Tree.ROOT = ROOT_ID;

export default Tree;

/**
 * @typedef {import('./adapter').TreeAdapter} TreeAdapter
 */

//  id: nodeID,
//  node,
//  parent,
//  children: map( adapter.getID, children )

/**
 * @typedef {Object} TreeNode
 * @property {string} id - node identifier
 * @property {any} node - the node itself
 * @property {string} parent - the parent node ID
 * @property {string[]} children - array of children IDs
 */
