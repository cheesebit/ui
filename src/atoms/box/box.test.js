import React from 'react';

import { Box } from './index';
import { keys, toArray } from '../../common/toolset';
import { render, getByText } from '../../../test/helpers';
import generator from '../../../test/data-generator';

const SIDES = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
  horizontal: 'horizontal',
  vertical: 'vertical',
};

describe('<Box />', () => {
  it('renders correctly', () => {
    const props = { children: generator.word() };

    const { getByTestId } = render(<Box {...props} />);

    const component = getByTestId('cb-box');

    expect(component).toHaveTextContent(props.children);
  });

  it('renders as <tag> correctly', () => {
    const props = {
      children: generator.word(),
      as: generator.pick(['div', 'span', 'section']),
    };

    const { getByTestId } = render(<Box {...props} />);

    const component = getByTestId('cb-box', { selector: props.as });

    expect(component).toHaveTextContent(props.children);
    expect(component).toBeInTheDocument();
  });

  it('renders leading correctly', () => {
    const props = {
      leading: generator.word(),
      children: generator.word(),
    };

    const { getByTestId } = render(<Box {...props} />);
    const component = getByTestId('cb-box');

    expect(component).toHaveTextContent(props.children);
    expect(getByText(component, props.leading)).toBeTruthy();
  });

  it('renders trailing correctly', () => {
    const props = {
      trailing: generator.word(),
      children: generator.word(),
    };

    const { getByTestId } = render(<Box {...props} />);
    const component = getByTestId('cb-box');

    expect(component).toHaveTextContent(props.children);
    expect(getByText(component, props.trailing)).toBeTruthy();
  });

  it('renders block correctly', () => {
    const props = {
      block: true,
      children: generator.word(),
    };

    const { getByTestId } = render(<Box {...props} />);
    const component = getByTestId('cb-box');

    expect(component).toHaveTextContent(props.children);
    expect(component).toHaveClass('-block');
  });

  describe('with paddingless', () => {
    it('renders paddingless enabled correctly', () => {
      const props = {
        paddingless: true,
        children: generator.word(),
      };

      const { getByTestId } = render(<Box {...props} />);
      const component = getByTestId('cb-box');

      expect(component).toHaveTextContent(props.children);
      expect(component).toHaveClass('cb-no-padding');
    });

    it('renders paddingless disabled correctly', () => {
      const props = {
        paddingless: false,
        children: generator.word(),
      };

      const { getByTestId } = render(<Box {...props} />);
      const component = getByTestId('cb-box');

      expect(component).toHaveTextContent(props.children);

      expect(component).not.toHaveClass('cb-no-padding');
      expect(component).not.toHaveClass('cb-no-top-padding');
      expect(component).not.toHaveClass('cb-no-right-padding');
      expect(component).not.toHaveClass('cb-no-bottom-padding');
      expect(component).not.toHaveClass('cb-no-left-padding');
    });

    it('renders single sided paddingless correctly', () => {
      const side = generator.pick(keys(SIDES));

      const props = {
        paddingless: side,
        children: generator.word(),
      };

      const { getByTestId } = render(<Box {...props} />);
      const component = getByTestId('cb-box');

      expect(component).toHaveTextContent(props.children);

      expect(component).not.toHaveClass('cb-no-padding');
      for (let s of toArray(SIDES[side])) {
        expect(component).toHaveClass(`cb-no-${s}-padding`);
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

      const { getByTestId } = render(<Box {...props} />);
      const component = getByTestId('cb-box');

      expect(component).toHaveTextContent(props.children);

      expect(component).not.toHaveClass('cb-no-padding');

      for (let side of sides) {
        for (let s of toArray(SIDES[side])) {
          expect(component).toHaveClass(`cb-no-${s}-padding`);
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

      const { getByTestId } = render(<Box {...props} />);
      const component = getByTestId('cb-box');

      expect(component).toHaveTextContent(props.children);
      expect(component).toHaveClass('cb-no-border');
    });

    it('renders borderless disabled correctly', () => {
      const props = {
        borderless: false,
        children: generator.word(),
      };

      const { getByTestId } = render(<Box {...props} />);
      const component = getByTestId('cb-box');

      expect(component).toHaveTextContent(props.children);

      expect(component).not.toHaveClass('cb-no-border');
      expect(component).not.toHaveClass('cb-no-top-border');
      expect(component).not.toHaveClass('cb-no-right-border');
      expect(component).not.toHaveClass('cb-no-bottom-border');
      expect(component).not.toHaveClass('cb-no-left-border');
    });

    it('renders single sided borderless correctly', () => {
      const side = generator.pick(keys(SIDES));

      const props = {
        borderless: side,
        children: generator.word(),
      };

      const { getByTestId } = render(<Box {...props} />);
      const component = getByTestId('cb-box');

      expect(component).toHaveTextContent(props.children);

      expect(component).not.toHaveClass('cb-no-border');
      for (let s of toArray(SIDES[side])) {
        expect(component).toHaveClass(`cb-no-${s}-border`);
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

      const { getByTestId } = render(<Box {...props} />);
      const component = getByTestId('cb-box');

      expect(component).toHaveTextContent(props.children);

      expect(component).not.toHaveClass('cb-no-border');

      for (let side of sides) {
        for (let s of toArray(SIDES[side])) {
          expect(component).toHaveClass(`cb-no-${s}-border`);
        }
      }
    });
  });
});
