import React from 'react';
import { shallow, mount } from 'enzyme';

import { Radio } from './index';
import { findByTestAttr } from '../../../test/helpers';
import generator from '../../../test/data-generator';

describe('Radio', () => {
  const label = generator.word();
  const props = {
    children: label,
    onChange: jest.fn(),
  };

  it('renders correctly', () => {
    const wrapper = shallow(<Radio {...props} />);
    const component = findByTestAttr(wrapper, 'cb-radio').dive();

    expect(component).toHaveLength(1);
    expect(component.find('input[type="radio"].selector')).toHaveLength(1);
  });

  it('renders descendants correctly', () => {
    const wrapper = shallow(<Radio {...props} />);
    const component = findByTestAttr(wrapper, 'cb-radio').dive();

    expect(component.text()).toContain(label);
  });

  it('triggers onChange when clicked', () => {
    const wrapper = shallow(<Radio {...props} />);
    const component = findByTestAttr(wrapper, 'cb-radio').dive();
    const input = component.find('input[type="radio"].selector');
    input.simulate('change');

    expect(props.onChange.mock.calls.length).toEqual(1);
  });
});
