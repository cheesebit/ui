import { isEmpty } from '../toolset';
import { Tree, adapter } from './../tree';
import AttributeManager, { Mode } from './attribute-manager';
import generator from '../../../test/data-generator';

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

describe('AttributeManager', () => {
  const tree = new Tree(adapter, items);
  const attributeManager = new AttributeManager(
    {
      'attr-unique': Mode.unique,
      'attr-path': Mode.path,
      'attr-propagate': Mode.propagate,
      'attr-toggle': Mode.toggle,
    },
    tree,
  );

  it('has the exact tree instance provided as parameter', () => {
    expect(attributeManager.tree).toBe(tree);
  });

  it('sets the provided value to the given nodeID, regardless of the attribute mode', () => {
    ids.forEach(nodeID => {
      const value = generator.word();

      attributeManager.set('attr-unique', nodeID, value);
      expect(attributeManager._assigned['attr-unique'][nodeID]).toEqual(value);

      attributeManager.set('attr-path', nodeID, value);
      expect(attributeManager._assigned['attr-path'][nodeID]).toEqual(value);

      attributeManager.set('attr-propagate', nodeID, value);
      expect(attributeManager._assigned['attr-propagate'][nodeID]).toEqual(
        value,
      );

      attributeManager.set('attr-toggle', nodeID, value);
      expect(attributeManager._assigned['attr-toggle'][nodeID]).toEqual(value);
    });
  });

  it('gets the provided value to the given nodeID, regardless of the attribute mode', () => {
    ids.forEach(nodeID => {
      const value = generator.word();

      attributeManager.set('attr-unique', nodeID, value);
      expect(
        attributeManager.getAttributeByNodeID('attr-unique', nodeID),
      ).toEqual(value);

      attributeManager.set('attr-path', nodeID, value);
      expect(
        attributeManager.getAttributeByNodeID('attr-path', nodeID),
      ).toEqual(value);

      attributeManager.set('attr-propagate', nodeID, value);
      expect(
        attributeManager.getAttributeByNodeID('attr-propagate', nodeID),
      ).toEqual(value);

      attributeManager.set('attr-toggle', nodeID, value);
      expect(
        attributeManager.getAttributeByNodeID('attr-toggle', nodeID),
      ).toEqual(value);
    });
  });

  it('unsets the provided value to the given nodeID, regardless of the attribute mode', () => {
    ids.forEach(nodeID => {
      const value = generator.word();

      attributeManager.set('attr-unique', nodeID, value);
      attributeManager.getAttributeByNodeID('attr-unique', nodeID);
      attributeManager.unset('attr-unique', nodeID);
      expect(
        attributeManager.getAttributeByNodeID('attr-unique', nodeID),
      ).toBeUndefined();

      attributeManager.set('attr-path', nodeID, value);
      attributeManager.getAttributeByNodeID('attr-path', nodeID);
      attributeManager.unset('attr-path', nodeID);
      expect(
        attributeManager.getAttributeByNodeID('attr-path', nodeID),
      ).toBeUndefined();

      attributeManager.set('attr-propagate', nodeID, value);
      attributeManager.getAttributeByNodeID('attr-propagate', nodeID);
      attributeManager.unset('attr-propagate', nodeID);
      expect(
        attributeManager.getAttributeByNodeID('attr-propagate', nodeID),
      ).toBeUndefined();

      attributeManager.set('attr-toggle', nodeID, value);
      attributeManager.getAttributeByNodeID('attr-toggle', nodeID);
      attributeManager.unset('attr-toggle', nodeID);
      expect(
        attributeManager.getAttributeByNodeID('attr-toggle', nodeID),
      ).toBeUndefined();
    });
  });

  describe('Unique mode', () => {
    it('ensures that only one node is assigned at a time', () => {
      attributeManager.reset('attr-unique');
      expect(isEmpty(attributeManager.getAttribute('attr-propagate'))).toBe(
        true,
      );

      ids.forEach(nodeID => {
        const value = generator.word();
        attributeManager.set('attr-unique', nodeID, value);
        expect(attributeManager.getAttribute('attr-unique')).toEqual({
          [nodeID]: value,
        });
      });
    });
  });

  describe('Path mode', () => {
    it('ensures that the path from the assigned node to root and its immediate children are assigned', () => {
      attributeManager.reset('attr-path');

      expect({ ...attributeManager.getAttribute('attr-path') }).toEqual({
        [Tree.ROOT]: true,
        '0': true,
        '0.options[0]': true,
        '0.options[0].options[0]': true,
        '0.options[0].options[1]': true,
        '0.options[1]': true,
        '0.options[1].options[0]': true,
        '0.options[1].options[1]': true,
      });

      let value = generator.word();
      attributeManager.set('attr-path', '0', value);
      expect({ ...attributeManager.getAttribute('attr-path') }).toEqual({
        [Tree.ROOT]: value,
        '0': value,
        '0.options[0]': value,
        '0.options[0].options[0]': true,
        '0.options[0].options[1]': true,
        '0.options[1]': value,
        '0.options[1].options[0]': true,
        '0.options[1].options[1]': true,
      });

      attributeManager.reset('attr-path');
      value = generator.word();
      attributeManager.set('attr-path', '0.options[0]', value);
      expect({ ...attributeManager.getAttribute('attr-path') }).toEqual({
        [Tree.ROOT]: value,
        '0': value,
        '0.options[0]': value,
        '0.options[0].options[0]': value,
        '0.options[0].options[1]': value,
        '0.options[1]': true,
        '0.options[1].options[0]': true,
        '0.options[1].options[1]': true,
      });

      attributeManager.reset('attr-path');
      value = generator.word();
      attributeManager.set('attr-path', '0.options[0].options[0]', value);
      expect({ ...attributeManager.getAttribute('attr-path') }).toEqual({
        [Tree.ROOT]: value,
        '0': value,
        '0.options[0]': value,
        '0.options[0].options[0]': value,
        '0.options[0].options[1]': true,
        '0.options[1]': true,
        '0.options[1].options[0]': true,
        '0.options[1].options[1]': true,
      });

      attributeManager.reset('attr-path');
      value = generator.word();
      attributeManager.set('attr-path', '0.options[0].options[1]', value);
      expect({ ...attributeManager.getAttribute('attr-path') }).toEqual({
        [Tree.ROOT]: value,
        '0': value,
        '0.options[0]': value,
        '0.options[0].options[0]': true,
        '0.options[0].options[1]': value,
        '0.options[1]': true,
        '0.options[1].options[0]': true,
        '0.options[1].options[1]': true,
      });

      attributeManager.reset('attr-path');
      value = generator.word();
      attributeManager.set('attr-path', '0.options[1]', value);
      expect({ ...attributeManager.getAttribute('attr-path') }).toEqual({
        [Tree.ROOT]: value,
        '0': value,
        '0.options[0]': true,
        '0.options[0].options[0]': true,
        '0.options[0].options[1]': true,
        '0.options[1]': value,
        '0.options[1].options[0]': value,
        '0.options[1].options[1]': value,
      });

      attributeManager.reset('attr-path');
      value = generator.word();
      attributeManager.set('attr-path', '0.options[1].options[0]', value);
      expect({ ...attributeManager.getAttribute('attr-path') }).toEqual({
        [Tree.ROOT]: value,
        '0': value,
        '0.options[0]': true,
        '0.options[0].options[0]': true,
        '0.options[0].options[1]': true,
        '0.options[1]': value,
        '0.options[1].options[0]': value,
        '0.options[1].options[1]': true,
      });

      attributeManager.reset('attr-path');
      value = generator.word();
      attributeManager.set('attr-path', '0.options[1].options[1]', value);
      expect({ ...attributeManager.getAttribute('attr-path') }).toEqual({
        [Tree.ROOT]: value,
        '0': value,
        '0.options[0]': true,
        '0.options[0].options[0]': true,
        '0.options[0].options[1]': true,
        '0.options[1]': value,
        '0.options[1].options[0]': true,
        '0.options[1].options[1]': value,
      });
    });
  });

  describe('Propagate mode', () => {
    it('ensures that the provided value is to propagated', () => {
      attributeManager.reset('attr-propagate');
      expect(isEmpty(attributeManager.getAttribute('attr-propagate'))).toBe(
        true,
      );

      let value = generator.word();
      attributeManager.set('attr-propagate', Tree.ROOT, value);
      expect(attributeManager.getAttribute('attr-propagate')).toEqual({
        [Tree.ROOT]: value,
        '0': value,
        '0.options[0]': value,
        '0.options[0].options[0]': value,
        '0.options[0].options[1]': value,
        '0.options[1]': value,
        '0.options[1].options[0]': value,
        '0.options[1].options[1]': value,
      });

      attributeManager.reset('attr-propagate');
      value = generator.word();
      attributeManager.set('attr-propagate', '0', value);
      expect(attributeManager.getAttribute('attr-propagate')).toEqual({
        [Tree.ROOT]: value,
        '0': value,
        '0.options[0]': value,
        '0.options[0].options[0]': value,
        '0.options[0].options[1]': value,
        '0.options[1]': value,
        '0.options[1].options[0]': value,
        '0.options[1].options[1]': value,
      });

      attributeManager.reset('attr-propagate');
      value = generator.word();
      attributeManager.set('attr-propagate', '0.options[0]', value);
      expect(attributeManager.getAttribute('attr-propagate')).toEqual({
        '0.options[0]': value,
        '0.options[0].options[0]': value,
        '0.options[0].options[1]': value,
      });

      attributeManager.reset('attr-propagate');
      value = generator.word();
      attributeManager.set('attr-propagate', '0.options[0].options[0]', value);
      expect(attributeManager.getAttribute('attr-propagate')).toEqual({
        '0.options[0].options[0]': value,
      });

      attributeManager.reset('attr-propagate');
      value = generator.word();
      attributeManager.set('attr-propagate', '0.options[0].options[1]', value);
      expect(attributeManager.getAttribute('attr-propagate')).toEqual({
        '0.options[0].options[1]': value,
      });

      attributeManager.reset('attr-propagate');
      value = generator.word();
      attributeManager.set('attr-propagate', '0.options[1]', value);
      expect(attributeManager.getAttribute('attr-propagate')).toEqual({
        '0.options[1]': value,
        '0.options[1].options[0]': value,
        '0.options[1].options[1]': value,
      });

      attributeManager.reset('attr-propagate');
      value = generator.word();
      attributeManager.set('attr-propagate', '0.options[1].options[0]', value);
      expect(attributeManager.getAttribute('attr-propagate')).toEqual({
        '0.options[1].options[0]': value,
      });

      attributeManager.reset('attr-propagate');
      value = generator.word();
      attributeManager.set('attr-propagate', '0.options[1].options[1]', value);
      expect(attributeManager.getAttribute('attr-propagate')).toEqual({
        '0.options[1].options[1]': value,
      });
    });

    it('ensures that, if all children of a given node are assigned, then it also becomes assigned', () => {
      attributeManager.reset('attr-propagate');
      expect(isEmpty(attributeManager.getAttribute('attr-propagate'))).toBe(
        true,
      );

      let value = generator.word();
      attributeManager.set('attr-propagate', '0.options[0].options[0]', value);
      expect(attributeManager.getAttribute('attr-propagate')).toEqual({
        '0.options[0].options[0]': value,
      });

      attributeManager.set('attr-propagate', '0.options[0].options[1]', value);
      expect(attributeManager.getAttribute('attr-propagate')).toEqual({
        '0.options[0]': value,
        '0.options[0].options[0]': value,
        '0.options[0].options[1]': value,
      });
    });

    it('ensures that, if the root node is assigned, then all nodes will be assigned', () => {
      attributeManager.reset('attr-propagate');
      expect(isEmpty(attributeManager.getAttribute('attr-propagate'))).toBe(
        true,
      );

      let value = generator.word();
      attributeManager.set('attr-propagate', Tree.ROOT, value);
      expect(attributeManager.getAttribute('attr-propagate')).toEqual({
        [Tree.ROOT]: value,
        '0': value,
        '0.options[0]': value,
        '0.options[0].options[0]': value,
        '0.options[0].options[1]': value,
        '0.options[1]': value,
        '0.options[1].options[0]': value,
        '0.options[1].options[1]': value,
      });
    });
  });

  describe('Toggle mode', () => {
    it('ensures nodes are freely assigned, one at a time', () => {
      attributeManager.reset('attr-toggle');
      expect(isEmpty(attributeManager.getAttribute('attr-toggle'))).toBe(true);

      let assigned = {};
      ids.forEach(nodeID => {
        const value = generator.word();
        assigned = { ...assigned, [nodeID]: value };

        attributeManager.set('attr-toggle', nodeID, value);
        expect(attributeManager.getAttribute('attr-toggle')).toEqual(assigned);
      });
    });
  });
});
