import React from 'react';
import { shallow } from 'enzyme';

import { Badge, Variant } from './index';
import { findByTestAttr } from '../../../test/helpers';
import generator from '../../../test/data-generator';

describe('Badge', () => {
  it('renders correctly', () => {
    const props = { children: generator.word() };

    const wrapper = shallow(<Badge {...props} />);
    const component = findByTestAttr(wrapper, 'cb-badge');

    expect(component).toHaveLength(1);
    expect(component.contains(props.children)).toBe(true);
  });

  describe('with variant', () => {
    it(`renders correctly with variant ${Variant.primary}`, () => {
      const props = { children: generator.word(), variant: Variant.primary };

      const wrapper = shallow(<Badge {...props} />);
      const component = findByTestAttr(wrapper, 'cb-badge');

      expect(component).toHaveLength(1);
      expect(component.hasClass('-primary')).toBe(true);
    });

    it(`renders correctly with variant ${Variant.secondary}`, () => {
      const props = { children: generator.word(), variant: Variant.secondary };

      const wrapper = shallow(<Badge {...props} />);
      const component = findByTestAttr(wrapper, 'cb-badge');

      expect(component).toHaveLength(1);
      expect(component.hasClass('-secondary')).toBe(true);
    });

    it(`renders correctly with variant ${Variant.terciary}`, () => {
      const props = { children: generator.word(), variant: Variant.terciary };

      const wrapper = shallow(<Badge {...props} />);
      const component = findByTestAttr(wrapper, 'cb-badge');

      expect(component).toHaveLength(1);
      expect(component.hasClass('-terciary')).toBe(true);
    });
  });
});
