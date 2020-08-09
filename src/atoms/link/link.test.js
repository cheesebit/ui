import React from 'react';
import { shallow } from 'enzyme';

import { screen, render } from '../../../test/helpers';
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

    const { getByTestId } = render(<Link {...props} />);
    const component = getByTestId('cb-link');

    it('renders correctly', () => {
      expect(component).toBeTruthy();
      expect(component).toHaveAttribute('href', props.href);
      expect(component).toHaveAttribute('alt', props.alt);
      expect(component).toHaveAttribute('title', props.title);
      expect(component).toHaveAttribute('target', props.target);
      expect(component).toHaveTextContent(props.children);
    });

    it(`adds ${Rel.noreferrer} to anchor element rel attribute`, () => {
      expect(component).toHaveAttribute('rel', Rel.noreferrer);
    });

    it('sets aria-label as the provided alt prop', () => {
      expect(component).toHaveAttribute('aria-label', props.alt);
    });

    it('renders alt prop as aria-label, if provided', () => {
      const props = {
        href: generator.url(),
        alt: generator.sentence(),
      };

      const { getByLabelText } = render(<Link {...props} />);
      const component = getByLabelText(props.alt);

      expect(component).toBeTruthy();
    });

    it('renders title prop as aria-label, if no alt is provided', () => {
      const props = {
        href: generator.url(),
        title: generator.sentence(),
      };

      const { getByLabelText } = render(<Link {...props} />);
      const component = getByLabelText(props.title);

      expect(component).toBeTruthy();
    });

    it('renders "#" as href if none is provided', () => {
      const props = {
        title: generator.sentence(),
      };

      const { getByTitle } = render(<Link {...props} />);
      const component = getByTitle(props.title);

      expect(component).toBeTruthy();
      expect(component).toHaveAttribute('href', '#');
    });

    it(`renders "${Target.blank}" as target if none is provided`, () => {
      const props = {
        title: generator.sentence(),
      };

      const { getByTitle } = render(<Link {...props} />);
      const component = getByTitle(props.title);

      expect(component).toBeTruthy();
      expect(component).toHaveAttribute('target', Target.blank);
    });
  });

  describe('with sanitized props', () => {
    const props = {
      href: 'javascript:copySecureData()',
      alt: generator.sentence(),
      children: generator.word(),
      target: Target.blank,
    };

    const { getByTitle } = render(<Link {...props} />);
    const component = getByTitle(props.alt);

    it('removes the insecure href prop', () => {
      expect(component).not.toHaveAttribute('href');
    });

    it(`adds ${Rel.noopener} to anchor element rel attribute, due to the target ${Target.blank}`, () => {
      expect(component.getAttribute('rel').includes(Rel.noopener)).toBe(true);
    });
  });
});
