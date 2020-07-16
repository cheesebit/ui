import React from 'react';
import { shallow } from 'enzyme';

import { Overlay, Theme } from './index';

import { findByTestAttr } from '../../../test/helpers';
import generator from '../../../test/data-generator';

describe('Overlay', () => {
  it('renders correctly', () => {
    const props = {
      children: generator.word(),
    };

    const wrapper = shallow(<Overlay {...props} />);
    const component = findByTestAttr(wrapper, 'cb-overlay');

    expect(component).toHaveLength(1);
    expect(component.text()).toContain(props.children);
  });

  describe('with theme', () => {
    it(`renders correctly with theme ${Theme.light}`, () => {
      const props = {
        children: generator.word(),
        theme: Theme.light,
      };

      const wrapper = shallow(<Overlay {...props} />);
      const component = findByTestAttr(wrapper, 'cb-overlay');

      expect(component).toHaveLength(1);
      expect(component.hasClass('-light')).toBe(true);
    });

    it(`renders correctly with theme ${Theme.dark}`, () => {
      const props = {
        children: generator.word(),
        theme: Theme.dark,
      };

      const wrapper = shallow(<Overlay {...props} />);
      const component = findByTestAttr(wrapper, 'cb-overlay');

      expect(component).toHaveLength(1);
      expect(component.hasClass('-dark')).toBe(true);
    });
  });
});
