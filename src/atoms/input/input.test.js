import React from 'react';
import { shallow } from 'enzyme';

import { Input, Variant } from './index';

import { findByTestAttr } from '../../../test/helpers';
import generator from '../../../test/data-generator';

describe('Input', () => {
  it('renders correctly', () => {
    const props = {
      type: 'text',
    };

    const wrapper = shallow(<Input {...props} />).dive();
    const component = findByTestAttr(wrapper, 'cb-input');

    expect(component).toHaveLength(1);
  });

  it('renders type correctly', () => {
    const props = {
      type: generator.pick([
        'button',
        'color',
        'date',
        'datetime-local',
        'email',
        'file',
        'hidden',
        'image',
        'month',
        'number',
        'password',
        'range',
        'reset',
        'search',
        'submit',
        'tel',
        'text',
        'time',
        'url',
        'week',
      ]),
    };

    const wrapper = shallow(<Input {...props} />).dive();
    const component = findByTestAttr(wrapper, 'cb-input');

    expect(component).toHaveLength(1);
    expect(component.prop('type')).toEqual(props.type);
  });

  describe('with variant', () => {
    it(`renders correctly with variant ${Variant.danger}`, () => {
      const props = {
        type: 'text',
        variant: Variant.danger,
      };

      const wrapper = shallow(<Input {...props} />).dive();
      const component = findByTestAttr(wrapper, 'cb-input');

      expect(component).toHaveLength(1);
      expect(component.hasClass('-danger')).toBe(true);
    });

    it(`renders correctly with variant ${Variant.info}`, () => {
      const props = {
        type: 'text',
        variant: Variant.info,
      };

      const wrapper = shallow(<Input {...props} />).dive();
      const component = findByTestAttr(wrapper, 'cb-input');

      expect(component).toHaveLength(1);
      expect(component.hasClass('-info')).toBe(true);
    });

    it(`renders correctly with variant ${Variant.success}`, () => {
      const props = {
        type: 'text',
        variant: Variant.success,
      };

      const wrapper = shallow(<Input {...props} />).dive();
      const component = findByTestAttr(wrapper, 'cb-input');

      expect(component).toHaveLength(1);
      expect(component.hasClass('-success')).toBe(true);
    });

    it(`renders correctly with variant ${Variant.warn}`, () => {
      const props = {
        type: 'text',
        variant: Variant.warn,
      };

      const wrapper = shallow(<Input {...props} />).dive();
      const component = findByTestAttr(wrapper, 'cb-input');

      expect(component).toHaveLength(1);
      expect(component.hasClass('-warn')).toBe(true);
    });
  });
});
