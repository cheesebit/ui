import React from 'react';

import { Tabbed } from './index';
import Tab from './tabbed-tab';

import { render, screen, userEvent, fireEvent } from '../../../test/helpers';
import generator from '../../../test/data-generator';

describe('Tabbed', () => {
  describe('default', () => {
    const amount = generator.natural({ min: 2, max: 10 });
    const tabs = generator.array({
      template: () => {
        return {
          for: generator.id(),
          label: generator.word({ length: 10 }),
        };
      },
      amount,
    });

    it('renders correctly', () => {
      const props = {
        tabs,
        children: tabs.map(tab => (
          <Tabbed.Panel key={tab.for} id={tab.for}>
            <h1>{tab.label}</h1>
            <p>{generator.paragraph()}</p>
          </Tabbed.Panel>
        )),
      };

      render(<Tabbed {...props} />);

      const component = screen.getByTestId('cb-tabbed');
      const activeIndicator = screen.getByTestId('active-indicator');

      expect(component).toBeTruthy();
      expect(activeIndicator).toBeTruthy();
    });

    it('renders all the individual tabs', () => {
      const props = {
        tabs,
        children: tabs.map(tab => (
          <Tabbed.Panel key={tab.for} id={tab.for}>
            <h1>{tab.label}</h1>
            <p>{generator.paragraph()}</p>
          </Tabbed.Panel>
        )),
      };

      render(<Tabbed {...props} />);

      expect(screen.getAllByTestId('tab')).toHaveLength(amount);
    });

    it('sets tab as active on tab click', () => {
      const props = {
        tabs,
        children: tabs.map(tab => (
          <Tabbed.Panel key={tab.for} id={tab.for}>
            <h1>{tab.label}</h1>
            <p>{generator.paragraph()}</p>
          </Tabbed.Panel>
        )),
      };

      render(<Tabbed {...props} />);

      const tabComponents = screen.getAllByRole('tab');
      const at = generator.natural({ min: 0, max: amount - 1 });

      userEvent.click(tabComponents[at]);
      expect(tabComponents[at]).toHaveClass('is-active');
    });
  });

  describe('Tab', () => {
    it('renders children as function', () => {
      const props = {
        id: generator.id(),
        active: generator.bool(),
        children: jest.fn(),
      };

      render(<Tab {...props} />);
      const component = screen.getByRole('tab');

      expect(component).toBeTruthy();
      expect(props.children).toHaveBeenCalledWith({
        id: props.id,
        active: props.active,
      });
    });
  });

  describe('overflow tabs to dropdown', () => {
    const amount = generator.natural({ min: 10, max: 15 });
    const to = generator.natural({ min: 1, max: 5 });

    const tabs = generator.array({
      template: () => {
        return {
          for: generator.id(),
          label: generator.word({ length: 10 }),
        };
      },
      amount,
    });

    const props = {
      tabs,
      children: tabs.map(tab => (
        <Tabbed.Panel key={tab.for} id={tab.for}>
          <h1>{tab.label}</h1>
          <p>{generator.paragraph()}</p>
        </Tabbed.Panel>
      )),
    };

    it(`renders a dropdown`, () => {
      render(<Tabbed {...props} />);
      const component = screen.getByTestId('cb-tabs');
      const dropdown = screen.getByTestId('cb-dropdown');

      expect(component).toBeTruthy();
      expect(dropdown).toBeTruthy();
    });

    // TODO: test amount of tabs and dropdown items
  });

  it('triggers `onFocus` callback on Panel to leverage default radio button behavior', () => {
    const props = {
      children: generator.paragraph(),
      onFocus: jest.fn(),
      id: generator.id(),
    };

    render(<Tabbed.Panel {...props} />);

    const event = { target: { id: props.id } };
    const radio = screen.getByTestId('panel-radio');
    fireEvent.focus(radio, event);

    expect(props.onFocus).toHaveBeenCalledWith({ id: event.target.id });
  });
});
