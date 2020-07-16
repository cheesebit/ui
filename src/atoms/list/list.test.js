import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../../test/helpers';
import { List } from './index';
import { values } from '../../common/toolset';
import generator from '../../../test/data-generator';

describe('List', () => {
  it('renders correctly', () => {
    const props = {
      children: generator.word(),
    };

    const wrapper = shallow(<List {...props} />);
    const component = findByTestAttr(wrapper, 'cb-list');

    expect(component).toHaveLength(1);
    expect(component.contains(props.children)).toBe(true);
  });

  it('renders bordered correctly', () => {
    const props = {
      children: generator.word(),
      bordered: true,
    };

    const wrapper = shallow(<List {...props} />);
    const component = findByTestAttr(wrapper, 'cb-list');

    expect(component).toHaveLength(1);
    expect(component.hasClass('-bordered')).toBe(true);
  });

  it('renders hoverable correctly', () => {
    const props = {
      children: generator.word(),
      hoverable: true,
    };

    const wrapper = shallow(<List {...props} />);
    const component = findByTestAttr(wrapper, 'cb-list');

    expect(component).toHaveLength(1);
    expect(component.hasClass('-hoverable')).toBe(true);
  });

  it('renders striped correctly', () => {
    const props = {
      children: generator.word(),
      striped: true,
    };

    const wrapper = shallow(<List {...props} />);
    const component = findByTestAttr(wrapper, 'cb-list');

    expect(component).toHaveLength(1);
    expect(component.hasClass('-striped')).toBe(true);
  });

  it('render list item correctly', () => {
    const props = {
      children: generator.sentence(),
    };

    const wrapper = shallow(<List.Item {...props} />);
    const component = findByTestAttr(wrapper, 'list-item');

    expect(component).toHaveLength(1);
  });

  it('render disabled list item correctly', () => {
    const props = {
      children: generator.sentence(),
      disabled: true,
    };

    const wrapper = shallow(<List.Item {...props} />);
    const component = findByTestAttr(wrapper, 'list-item');

    expect(component).toHaveLength(1);
    expect(component.hasClass('is-disabled')).toBe(true);
  });
});
