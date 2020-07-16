import React from 'react';
import { shallow } from 'enzyme';

import { Box } from './index';
import { findByTestAttr, asTestAttr } from '../../../test/helpers';
import { keys, values, toArray } from '../../common/toolset';
import generator from '../../../test/data-generator';

const SIDES = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
  horizontal: ['right', 'left'],
  vertical: ['top', 'bottom'],
};

describe('Box', () => {
  it('renders correctly', () => {
    const props = { children: generator.word() };

    const wrapper = shallow(<Box {...props} />);
    const component = findByTestAttr(wrapper, 'cb-box');

    expect(component).toHaveLength(1);
    expect(component.contains(props.children)).toBe(true);
  });

  it('renders as <tag> correctly', () => {
    const props = {
      children: generator.word(),
      as: generator.pick(['div', 'span', 'section']),
    };

    const wrapper = shallow(<Box {...props} />);
    expect(wrapper.find(`${props.as}${asTestAttr('cb-box')}`)).toHaveLength(1);
  });

  it('renders leading correctly', () => {
    const props = {
      leading: generator.word(),
      children: generator.word(),
    };

    const wrapper = shallow(<Box {...props} />);
    const component = findByTestAttr(wrapper, 'cb-box');

    const leading = component.find('.leading');

    expect(leading).toHaveLength(1);
    expect(leading.contains(props.leading)).toBe(true);
  });

  it('renders trailing correctly', () => {
    const props = {
      trailing: generator.word(),
      children: generator.word(),
    };

    const wrapper = shallow(<Box {...props} />);
    const component = findByTestAttr(wrapper, 'cb-box');

    const trailing = component.find('.trailing');

    expect(trailing).toHaveLength(1);
    expect(trailing.contains(props.trailing)).toBe(true);
  });

  it('renders stretched correctly', () => {
    const props = {
      stretched: true,
      children: generator.word(),
    };

    const wrapper = shallow(<Box {...props} />);
    const component = findByTestAttr(wrapper, 'cb-box');

    expect(component).toHaveLength(1);
    expect(component.hasClass('-stretched')).toBe(true);
  });

  describe('with paddingless', () => {
    it('renders paddingless enabled correctly', () => {
      const props = {
        paddingless: true,
        children: generator.word(),
      };

      const wrapper = shallow(<Box {...props} />);
      const component = findByTestAttr(wrapper, 'cb-box');

      expect(component).toHaveLength(1);
      expect(component.hasClass('cb-no-padding')).toBe(true);
    });

    it('renders paddingless disabled correctly', () => {
      const props = {
        paddingless: false,
        children: generator.word(),
      };

      const wrapper = shallow(<Box {...props} />);
      const component = findByTestAttr(wrapper, 'cb-box');

      expect(component).toHaveLength(1);
      expect(component.hasClass('cb-no-padding')).toBe(false);
    });

    it('renders single sided paddingless correctly', () => {
      const side = generator.pick(keys(SIDES));

      const props = {
        paddingless: side,
        children: generator.word(),
      };

      const wrapper = shallow(<Box {...props} />);
      const component = findByTestAttr(wrapper, 'cb-box');

      expect(component).toHaveLength(1);
      for (let s of toArray(SIDES[side])) {
        expect(component.hasClass(`cb-no-${s}-padding`)).toBe(true);
      }
    });

    it('renders sided paddingless correctly', () => {
      const sides = generator.pick(keys(SIDES), {
        quantity: generator.natural({ min: 2, max: 4 }),
      });

      const props = {
        paddingless: sides,
        children: generator.word(),
      };

      const wrapper = shallow(<Box {...props} />);
      const component = findByTestAttr(wrapper, 'cb-box');

      expect(component).toHaveLength(1);
      for (let side of sides) {
        for (let s of toArray(SIDES[side])) {
          expect(component.hasClass(`cb-no-${s}-padding`)).toBe(true);
        }
      }
    });
  });

  describe('with borderless', () => {
    it('renders borderless enabled correctly', () => {
      const props = {
        borderless: true,
        children: generator.word(),
      };

      const wrapper = shallow(<Box {...props} />);
      const component = findByTestAttr(wrapper, 'cb-box');

      expect(component).toHaveLength(1);
      expect(component.hasClass('cb-no-border')).toBe(true);
    });

    it('renders borderless disabled correctly', () => {
      const props = {
        borderless: false,
        children: generator.word(),
      };

      const wrapper = shallow(<Box {...props} />);
      const component = findByTestAttr(wrapper, 'cb-box');

      expect(component).toHaveLength(1);
      expect(component.hasClass('cb-no-border')).toBe(false);
    });

    it('renders single sided borderless correctly', () => {
      const side = generator.pick(keys(SIDES));

      const props = {
        borderless: side,
        children: generator.word(),
      };

      const wrapper = shallow(<Box {...props} />);
      const component = findByTestAttr(wrapper, 'cb-box');

      expect(component).toHaveLength(1);
      for (let s of toArray(SIDES[side])) {
        expect(component.hasClass(`cb-no-${s}-border`)).toBe(true);
      }
    });

    it('renders sided borderless correctly', () => {
      const sides = generator.pick(keys(SIDES), {
        quantity: generator.natural({ min: 2, max: 4 }),
      });

      const props = {
        borderless: sides,
        children: generator.word(),
      };

      const wrapper = shallow(<Box {...props} />);
      const component = findByTestAttr(wrapper, 'cb-box');

      expect(component).toHaveLength(1);
      for (let side of sides) {
        for (let s of toArray(SIDES[side])) {
          expect(component.hasClass(`cb-no-${s}-border`)).toBe(true);
        }
      }
    });
  });
});
