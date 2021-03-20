import React from 'react';

import { render, userEvent } from '../../../test/helpers';
import { Tabs } from './index';
import generator from '../../../test/data-generator';
import Tab from './tabs-tab';

describe('Tabs', () => {
  describe('default', () => {
    const amount = generator.natural({ min: 2, max: 10 });
    const tabs = generator.array(() => {
      return {
        id: generator.id(),
        for: generator.id(),
        label: generator.word({ length: 10 }),
      };
    }, amount);

    it('renders correctly', () => {
      const props = {
        items: tabs,
      };

      const { getByTestId } = render(<Tabs {...props} />);

      const component = getByTestId('cb-tabs');
      const activeIndicator = getByTestId('active-indicator');

      expect(component).toBeTruthy();
      expect(activeIndicator).toBeTruthy();
    });

    it('renders all the individual tabs', () => {
      const props = {
        items: tabs,
      };

      const { getAllByRole } = render(<Tabs {...props} />);

      expect(getAllByRole('tab')).toHaveLength(amount);
    });

    it('sets tab as active on tab click', () => {
      const props = {
        items: tabs,
      };

      const { getAllByRole } = render(<Tabs {...props} />);

      const tabComponents = getAllByRole('tab');
      const at = generator.natural({ min: 0, max: amount - 1 });

      userEvent.click(tabComponents[at]);
      expect(tabComponents[at]).toHaveClass('is-active');
    });

    it('renders children as function', () => {
      const props = {
        id: generator.id(),
        active: generator.bool(),
        children: jest.fn(),
      };

      const { getByRole } = render(<Tab {...props} />);
      const component = getByRole('tab');

      expect(component).toBeTruthy();
      expect(props.children).toHaveBeenCalledWith({
        id: props.id,
        active: props.active,
      });
    });
  });

  describe('overflow tabs to dropdown', () => {
    const amount = generator.natural({ min: 10, max: 15 });

    const tabs = generator.array(() => {
      return {
        id: generator.id(),
        for: generator.id(),
        label: generator.word({ length: 10 }),
      };
    }, amount);

    const props = {
      items: tabs,
    };

    it(`renders a dropdown`, () => {
      const { getByTestId } = render(<Tabs {...props} />);

      const component = getByTestId('cb-tabs');
      const dropdown = getByTestId('cb-dropdown');

      expect(component).toBeTruthy();
      expect(dropdown).toBeTruthy();
    });

    // TODO: test amount of tabs and dropdown items
  });
});
