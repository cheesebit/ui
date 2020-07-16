import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../../test/helpers';
import { Link } from './index';
import { Target, Rel } from './link';
import { values } from '../../common/toolset';
import generator from '../../../test/data-generator';

describe('Link', () => {
  describe('default', () => {
    const props = {
      href: generator.url(),
      alt: generator.sentence(),
      title: generator.sentence(),
      children: generator.word(),
      target: generator.pick(values(Target)),
    };

    const wrapper = shallow(<Link {...props} />);
    const component = findByTestAttr(wrapper, 'c-link');

    it('renders correctly', () => {
      expect(component).toHaveLength(1);
      expect(component.prop('href')).toEqual(props.href);
      expect(component.prop('alt')).toEqual(props.alt);
      expect(component.prop('title')).toEqual(props.title);
      expect(component.prop('target')).toEqual(props.target);
      expect(component.text()).toBe(props.children);
    });

    it(`adds ${Rel.noreferrer} to anchor element rel attribute`, () => {
      expect(component.prop('rel')).toContain(Rel.noreferrer);
    });

    it('sets aria-label as the provided alt prop', () => {
      expect(component.prop('aria-label')).toBe(props.alt);
    });

    it('renders alt prop as aria-label, if provided', () => {
      const props = {
        href: generator.url(),
        alt: generator.sentence(),
      };

      const wrapper = shallow(<Link {...props} />);
      const component = findByTestAttr(wrapper, 'c-link');

      expect(component).toHaveLength(1);
      expect(component.prop('aria-label')).toEqual(props.alt);
    });

    it('renders title prop as aria-label, if no alt is provided', () => {
      const props = {
        href: generator.url(),
        title: generator.sentence(),
      };

      const wrapper = shallow(<Link {...props} />);
      const component = findByTestAttr(wrapper, 'c-link');

      expect(component).toHaveLength(1);
      expect(component.prop('aria-label')).toEqual(props.title);
    });

    it('renders "#" as href if none is provided', () => {
      const props = {
        title: generator.sentence(),
      };

      const wrapper = shallow(<Link {...props} />);
      const component = findByTestAttr(wrapper, 'c-link');

      expect(component).toHaveLength(1);
      expect(component.prop('href')).toEqual('#');
    });

    it(`renders "${Target.blank}" as target if none is provided`, () => {
      const props = {
        title: generator.sentence(),
      };

      const wrapper = shallow(<Link {...props} />);
      const component = findByTestAttr(wrapper, 'c-link');

      expect(component).toHaveLength(1);
      expect(component.prop('target')).toEqual(Target.blank);
    });
  });

  describe('with sanitized props', () => {
    const props = {
      href: 'javascript:copySecureData()',
      alt: generator.sentence(),
      children: generator.word(),
      target: Target.blank,
    };

    const wrapper = shallow(<Link {...props} />);
    const component = findByTestAttr(wrapper, 'c-link');

    it('removes the insecure href prop', () => {
      expect(component.prop('href')).toBeUndefined();
    });

    it(`adds ${Rel.noopener} to anchor element rel attribute, due to the target ${Target.blank}`, () => {
      expect(component.prop('rel')).toContain(Rel.noopener);
    });
  });
});
