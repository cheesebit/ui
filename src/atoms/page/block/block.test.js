import React from 'react';
import { shallow } from 'enzyme';

import Block from './block';

import { findByTestAttr } from '../../../../test/helpers';
import generator from '../../../../test/data-generator';

describe('Block', () => {
  it('renders correctly', () => {
    const props = {
      children: generator.paragraph(),
    };

    const wrapper = shallow(<Block {...props} />);
    const component = findByTestAttr(wrapper, 'cb-block');

    expect(component).toHaveLength(1);
    expect(component.text()).toContain(props.children);
  });

  it('renders `main` correctly', () => {
    const props = {
      children: generator.paragraph(),
      main: true,
    };

    const wrapper = shallow(<Block {...props} />);
    const component = findByTestAttr(wrapper, 'cb-block');

    expect(component).toHaveLength(1);
    expect(component.hasClass('-main')).toBe(true);
  });
});
