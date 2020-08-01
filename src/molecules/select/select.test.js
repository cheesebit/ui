import React from 'react';
import { mount, shallow } from 'enzyme';

import { Select } from './index';
import { Icon } from '../../atoms/icon';
import { findByTestAttr, asTestAttr } from '../../../test/helpers';
import generator from '../../../test/data-generator';

describe('Select', () => {
  it('renders correctly', () => {
    const props = {
      options: generator.array({
        template: () => ({
          label: generator.name(),
          value: generator.id(),
        }),
      }),
    };

    const wrapper = mount(<Select {...props} />);
    const component = wrapper.find(`div${asTestAttr('cb-select')}`);

    const options = wrapper.find(`button${asTestAttr('option')}`);

    expect(component).toHaveLength(1);
    expect(options).toHaveLength(props.options.length);
  });

  it.skip('sets as selected when an option is clicked', () => {
    const props = {
      options: generator.array({
        template: () => ({
          label: generator.name(),
          value: generator.id(),
        }),
      }),
    };

    const wrapper = shallow(<Select {...props} />);
    const instance = wrapper.instance();

    const option = generator.pick(props.options);
    instance.handleSelect({ value: option.value });

    expect(wrapper.state('selected')).toBe(option.value);
  });
});
