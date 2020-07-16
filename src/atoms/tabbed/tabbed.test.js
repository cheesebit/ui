import React from 'react';
import { mount, shallow } from 'enzyme';

import { Tabbed } from './index';
import Tabs from './tabbed-tabs';
import Tab from './tabbed-tab';

import { asTestAttr, findByTestAttr } from '../../../test/helpers';
import generator from '../../../test/data-generator';

jest.mock('./dom-helper.js');

describe('Tabbed', () => {
  describe('default', () => {
    const amount = generator.natural({ min: 5, max: 10 });
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

    const wrapper = mount(<Tabbed {...props} />);
    let component = findByTestAttr(wrapper, 'c-tabbed');

    it('renders correctly', () => {
      expect(component).toHaveLength(1);
    });

    it('renders the active indicator', () => {
      expect(component.find(asTestAttr('active-indicator'))).toHaveLength(1);
    });

    it('renders all the individual tabs', () => {
      expect(component.find(`label${asTestAttr('tab')}`)).toHaveLength(amount);
    });

    it('sets tab as active on tab click', () => {
      const at = generator.natural({ min: 0, max: amount - 1 });

      component.find(asTestAttr('tab')).at(at).find('label').simulate('click');

      wrapper.update();

      component = findByTestAttr(wrapper, 'cb-tabs');
      const tab = component.find(asTestAttr('tab')).at(at);

      expect(tab.hasClass('is-active')).toBe(true);
    });
  });

  describe('Tab', () => {
    it('renders children as function', () => {
      const props = {
        id: generator.id(),
        active: generator.bool(),
        children: jest.fn(),
      };

      const wrapper = shallow(<Tab {...props} />).dive();
      const component = findByTestAttr(wrapper, 'tab');

      expect(component).toHaveLength(1);
      expect(props.children).toHaveBeenCalledWith({
        id: props.id,
        active: props.active,
      });
    });
  });

  describe('Tabs', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it('updates active indicator when prop `active` changes', () => {
      const props = {
        id: generator.id(),
        active: 1,
        children: jest.fn(),
      };

      const wrapper = mount(<Tabs {...props} />);
      const instance = wrapper.instance();

      instance.moveTabIndicatorToActiveTab = jest.fn();

      wrapper.setProps({ active: 2 });

      expect(instance.moveTabIndicatorToActiveTab).toHaveBeenCalled();
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

    const wrapper = mount(<Tabbed {...props} />);
    const component = findByTestAttr(wrapper, 'cb-tabs');
    const dropdown = findByTestAttr(component, 'cb-dropdown');

    it(`renders a dropdown`, () => {
      expect(dropdown).toHaveLength(1);
    });

    // TODO: test amount of tabs and dropdown items
  });

  it('triggers `onFocus` callback on Panel to leverage default radio button behavior', () => {
    const props = {
      children: generator.paragraph(),
      onFocus: jest.fn(),
      id: generator.id(),
    };

    const wrapper = shallow(<Tabbed.Panel {...props} />);
    const event = { target: { id: props.id } };

    wrapper.find(asTestAttr('panel-radio')).simulate('focus', event);

    expect(props.onFocus).toHaveBeenCalledWith({ id: event.target.id });
  });
});
