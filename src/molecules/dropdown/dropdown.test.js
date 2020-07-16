import React from 'react';
import { mount } from 'enzyme';

import { Dropdown } from './index';
import { Icon } from '../../atoms/icon';
import { findByTestAttr, asTestAttr } from '../../../test/helpers';
import generator from '../../../test/data-generator';

describe('Dropdown', () => {
  describe('default', () => {
    const props = {
      toggle: <Icon name="bell" size={12} />,
      items: generator.array({
        template: () => {
          return {
            id: generator.id(),
            label: generator.word(),
            icon: 'bell',
            onClick: jest.fn(),
          };
        },
        amount: generator.natural({ min: 3, max: 10 }),
      }),
      header: generator.word(),
      footer: generator.word(),
    };

    const wrapper = mount(<Dropdown {...props} />);
    const component = findByTestAttr(wrapper, 'cb-dropdown');
    const toggle = wrapper.find(Dropdown.Toggle);
    const items = findByTestAttr(wrapper, 'items').first();

    it('renders correctly', () => {
      expect(component).toHaveLength(1);
      expect(toggle).toHaveLength(1);
      expect(items).toHaveLength(1);
    });

    it('renders items correctly', () => {
      expect(items).toHaveLength(1);
      expect(wrapper.find(`button${asTestAttr('item')}`)).toHaveLength(
        props.items.length,
      );
    });
  });

  describe('custom parts', () => {});
});
