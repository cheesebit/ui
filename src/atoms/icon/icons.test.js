import React from 'react';
import { shallow } from 'enzyme';

import { Icon } from './index';

import { findByTestAttr } from '../../../test/helpers';
import { keys } from '../../common/toolset';
import generator from '../../../test/data-generator';
import mapping from './icon-mapping';

describe('Icon', () => {
  it('renders correctly', () => {
    const props = {
      name: generator.pick(keys(mapping)),
    };

    const wrapper = shallow(<Icon {...props} />);
    const component = findByTestAttr(wrapper, 'cb-icon');

    expect(component).toHaveLength(1);
  });

  it(`renders an '?' when icon does not exist`, () => {
    const props = {
      name: generator.word(),
    };

    const wrapper = shallow(<Icon {...props} />);
    expect(wrapper.text()).toEqual('?');
  });
});
