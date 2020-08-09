import React from 'react';

import { Dropdown } from './index';
import { Icon } from '../../atoms/icon';
import { screen, render, getAllByTestId } from '../../../test/helpers';
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

    render(<Dropdown {...props} />);

    const component = screen.getByTestId('cb-dropdown');
    const toggle = screen.getByTestId('toggle');
    const items = screen.getByTestId('items');

    it('renders correctly', () => {
      expect(component).toBeTruthy();
      expect(toggle).toBeTruthy();
      expect(items).toBeTruthy();
    });

    it('renders items correctly', () => {
      expect(items).toBeTruthy();
      expect(getAllByTestId(items, 'item')).toHaveLength(props.items.length);
    });
  });

  describe('custom parts', () => {});
});
