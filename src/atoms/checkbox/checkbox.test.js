import React from 'react';
import { shallow, mount } from 'enzyme';

import { Checkbox } from './index';
import { findByTestAttr } from '../../../test/helpers';
import generator from '../../../test/data-generator';

describe('Checkbox', () => {
  const label = generator.word();
  const props = {
    children: label,
    onChange: jest.fn(),
  };

  it('renders correctly', () => {
    const wrapper = shallow(<Checkbox {...props} />);
    const component = findByTestAttr(wrapper, 'cb-checkbox').dive();

    expect(component).toHaveLength(1);
    expect(component.find('input[type="checkbox"].selector')).toHaveLength(1);
  });

  it('renders descendants correctly', () => {
    const wrapper = shallow(<Checkbox {...props} />);
    const component = findByTestAttr(wrapper, 'cb-checkbox').dive();

    expect(component.text()).toContain(label);
  });

  it('triggers onChange when clicked', () => {
    const wrapper = shallow(<Checkbox {...props} />);
    const component = findByTestAttr(wrapper, 'cb-checkbox').dive();
    const input = component.find('input[type="checkbox"].selector');
    input.simulate('change');

    expect(props.onChange.mock.calls.length).toEqual(1);
  });
});
