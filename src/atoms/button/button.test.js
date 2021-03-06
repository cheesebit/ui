import React from 'react';

import { Button } from './index';
import { Emphasis, Size } from './button';
import { render, fireEvent } from '../../../test/helpers';
import generator from '../../../test/data-generator';

describe('<Button />', () => {
  it('renders correctly', () => {
    const props = { children: generator.word() };

    const { getByTestId } = render(<Button {...props} />);

    const component = getByTestId('cb-button');

    expect(component).toHaveAttribute('type', 'button');
    expect(component).toHaveTextContent(props.children);
    expect(component).toHaveClass('-small');
  });

  it('renders with correct type', () => {
    const props = {
      type: generator.pick(['button', 'submit', 'reset']),
      children: generator.word(),
    };

    const { getByTestId } = render(<Button {...props} />);

    const component = getByTestId('cb-button');

    expect(component).toHaveAttribute('type', props.type);
    expect(component).toHaveTextContent(props.children);
  });

  describe('emphasis', () => {
    it('renders text emphasis correctly', () => {
      const props = {
        children: generator.word(),
        emphasis: Emphasis.text,
      };

      const { getByTestId } = render(<Button {...props} />);

      const component = getByTestId('cb-button');

      expect(component).toHaveClass('-text');
    });

    it('renders ghost emphasis correctly', () => {
      const props = {
        children: generator.word(),
        emphasis: Emphasis.ghost,
      };

      const { getByTestId } = render(<Button {...props} />);

      const component = getByTestId('cb-button');

      expect(component).toHaveClass('-ghost');
    });

    it('renders flat emphasis correctly', () => {
      const props = {
        children: generator.word(),
        emphasis: Emphasis.flat,
      };

      const { getByTestId } = render(<Button {...props} />);

      const component = getByTestId('cb-button');

      expect(component).toHaveClass('-flat');
    });
  });

  describe('size', () => {
    it('renders the proper small class', () => {
      const props = {
        children: generator.word(),
        size: Size.small,
      };

      const { getByTestId } = render(<Button {...props} />);

      const component = getByTestId('cb-button');

      expect(component).toHaveClass('-small');
    });

    it('renders the proper medium class', () => {
      const props = {
        children: generator.word(),
        size: Size.medium,
      };

      const { getByTestId } = render(<Button {...props} />);

      const component = getByTestId('cb-button');

      expect(component).toHaveClass('-medium');
    });

    it('renders the proper large class', () => {
      const props = {
        children: generator.word(),
        size: Size.large,
      };

      const { getByTestId } = render(<Button {...props} />);

      const component = getByTestId('cb-button');

      expect(component).toHaveClass('-large');
    });
  });

  describe('icon', () => {
    it('with icon only', () => {
      const props = {
        icon: 'search',
      };

      const { getByTestId } = render(<Button {...props} />);

      const component = getByTestId('cb-button');
      const icon = getByTestId('cb-icon');

      expect(component).toContainElement(icon);
    });

    it('with icon and label as children', () => {
      const label = generator.word();
      const props = {
        icon: 'search',
        children: label,
      };

      const { getByTestId } = render(<Button {...props} />);

      const component = getByTestId('cb-button');
      const icon = getByTestId('cb-icon');

      expect(component).toHaveTextContent(props.children);
      expect(component).toContainElement(icon);
    });
  });

  it('reacts correctly when onClick is called', () => {
    const props = {
      children: generator.word(),
      onClick: jest.fn(),
    };

    const { getByTestId } = render(<Button {...props} />);

    const component = getByTestId('cb-button');
    fireEvent.click(component);
    expect(props.onClick).toHaveBeenCalled();
  });

  it('does not react when disabled', () => {
    const props = {
      children: generator.word(),
      disabled: true,
      onClick: jest.fn(),
    };

    const { getByTestId } = render(<Button {...props} />);

    const component = getByTestId('cb-button');

    expect(component).toHaveAttribute('disabled');
    fireEvent.click(component);
    expect(props.onClick).not.toHaveBeenCalled();
  });
});
