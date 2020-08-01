import get from 'lodash.get';

import { isEmpty, isNil, keys, mandatory, map, merge } from '../toolset';
import { DEFAULT } from '../constants';

const ROOT_ID = '*$+#_ROOT_#+$*';

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
    buildNodes(adapter, children, nodeID),
  );
}

function buildNodes(adapter, nodes, parentID) {
  let tree = {};

  (nodes || DEFAULT.ARRAY).forEach(item => {
    try {
      tree = merge(tree, buildNode(adapter, item, parentID));
    } catch (error) {
      console.error(error);
    }
  });

  return tree;
}

function buildTree(adapter, nodes) {
  const children = buildNodes(adapter, nodes, ROOT_ID);

  if (isEmpty(children)) {
    return {};
  }

  let root = {
    ...children,
    [ROOT_ID]: {
      id: ROOT_ID,
      node: null,
      parent: null,
      children: keys(children).filter(
        childID => children[childID].parent === ROOT_ID,
      ),
    },
  };

  return root;
}

class Tree {
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
