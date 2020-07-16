import React from 'react';

import { Button } from './index';
import { Emphasis, Size } from './button';
import { asTestAttr, findByTestAttr } from '../../../test/helpers';
import { Icon } from '../icon';
import { shallow, mount } from 'enzyme';
import generator from '../../../test/data-generator';

describe('Button', () => {
  it('renders correctly', () => {
    const label = generator.word();

    const wrapper = shallow(<Button>{label}</Button>);
    const component = findByTestAttr(wrapper, 'cb-button').dive();

    expect(component).toHaveLength(1);
    expect(component.text()).toEqual(label);
  });

  describe('emphasis', () => {
    it('renders text emphasis correctly', () => {
      const props = {
        children: generator.word(),
        emphasis: Emphasis.text,
      };

      const wrapper = shallow(<Button {...props} />);
      const component = findByTestAttr(wrapper, 'cb-button');

      expect(component.hasClass('-text')).toBe(true);
    });

    it('renders ghost emphasis correctly', () => {
      const props = {
        children: generator.word(),
        emphasis: Emphasis.ghost,
      };

      const wrapper = shallow(<Button {...props} />);
      const component = findByTestAttr(wrapper, 'cb-button');

      expect(component.hasClass('-ghost')).toBe(true);
    });

    it('renders flat emphasis correctly', () => {
      const props = {
        children: generator.word(),
        emphasis: Emphasis.flat,
      };

      const wrapper = shallow(<Button {...props} />);
      const component = findByTestAttr(wrapper, 'cb-button');

      expect(component.hasClass('-flat')).toBe(true);
    });
  });

  describe('size', () => {
    it('renders the proper small class', () => {
      const props = {
        children: generator.word(),
        size: Size.small,
      };

      const wrapper = shallow(<Button {...props} />);
      const component = findByTestAttr(wrapper, 'cb-button');

      expect(component.hasClass('-small')).toBe(true);
    });

    it('renders the proper medium class', () => {
      const props = {
        children: generator.word(),
        size: Size.medium,
      };

      const wrapper = shallow(<Button {...props} />);
      const component = findByTestAttr(wrapper, 'cb-button');

      expect(component.hasClass('-medium')).toBe(true);
    });

    it('renders the proper large class', () => {
      const props = {
        children: generator.word(),
        size: Size.large,
      };

      const wrapper = shallow(<Button {...props} />);
      const component = findByTestAttr(wrapper, 'cb-button');

      expect(component.hasClass('-large')).toBe(true);
    });
  });

  describe('icon', () => {
    it('with icon only', () => {
      const props = {
        icon: 'search',
      };

      const wrapper = shallow(<Button {...props} />);
      const component = findByTestAttr(wrapper, 'cb-button').dive();

      expect(component.contains(<Icon name="search" size={16} />)).toEqual(
        true,
      );
    });

    it('with icon and label as children', () => {
      const label = generator.word();
      const props = {
        icon: 'search',
        children: label,
      };

      const wrapper = shallow(<Button {...props} />);
      const component = findByTestAttr(wrapper, 'cb-button').dive();
      const icon = findByTestAttr(component, 'cb-icon');

      expect(component.contains(<Icon name="search" size={16} />)).toEqual(
        true,
      );
      expect(component.text()).toContain(label);
    });
  });

  it('reacts correctly when onClick is called', () => {
    const props = {
      children: generator.word(),
      onClick: jest.fn(),
    };

    const wrapper = shallow(<Button {...props} />);
    const component = findByTestAttr(wrapper, 'cb-button');
    component.simulate('click');

    expect(props.onClick.mock.calls.length).toEqual(1);
  });

  it('does not react when disabled', () => {
    const props = {
      children: generator.word(),
      disabled: true,
      onClick: jest.fn(),
    };

    // using mount since shallow does not respect the disabled prop
    const wrapper = mount(<Button {...props} />);
    const component = wrapper.find(`button${asTestAttr('cb-button')}`);

    expect(component.prop('disabled')).toBe(true);

    // does nothing when clicked
    component.simulate('click');
    expect(props.onClick.mock.calls.length).toEqual(0);
  });
});
