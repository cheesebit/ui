import React from 'react';

import { Button } from './index';
import { EMPHASIS, SIZE, TYPE } from './button';
import { findByTestAttr } from '../../../test/helpers';
import { values } from '../../common/toolset';
import generator from '../../../test/data-generator';

describe('Button', () => {
  it('renders correctly', () => {
    const label = generator.word();

    const wrapper = shallow(<Button>{label}</Button>);
    const component = findByTestAttr(wrapper, 'cb-button');

    expect(component).to.have.length(1);
    expect(component.text()).to.equal(label);
  });

  describe('emphasis', () => {
    it('renders the proper low emphasis class', () => {
      const props = {
        children: generator.word(),
        emphasis: EMPHASIS.LOW
      };

      const wrapper = shallow(<Button {...props} />);
      const component = findByTestAttr(wrapper, 'cb-button');

      expect(component).to.have.className('-low-emphasis');
    });

    it('renders the proper medium emphasis class', () => {
      const props = {
        children: generator.word(),
        emphasis: EMPHASIS.MEDIUM
      };

      const wrapper = shallow(<Button {...props} />);
      const component = findByTestAttr(wrapper, 'cb-button');

      expect(component).to.have.className('-medium-emphasis');
    });

    it('renders the proper high emphasis class', () => {
      const props = {
        children: generator.word(),
        emphasis: EMPHASIS.HIGH
      };

      const wrapper = shallow(<Button {...props} />);
      const component = findByTestAttr(wrapper, 'cb-button');

      expect(component).to.have.className('-high-emphasis');
    });
  });
});
