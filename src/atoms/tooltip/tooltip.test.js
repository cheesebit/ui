import React from 'react';

import { calculatePosition } from './tooltip.helpers';
import { screen, render, userEvent } from '../../../test/helpers';
import { Tooltip } from './index';
import generator from '../../../test/data-generator';

describe('<Tooltip />', () => {
  it('renders untouched children if no title is provided', () => {
    const props = {
      children: <span>{generator.word()}</span>,
    };

    render(<Tooltip {...props} />);

    expect(screen.queryByTestId('cb-tooltip')).toBeNull();
  });

  it('renders correctly with title prop', () => {
    const props = {
      title: generator.sentence(),
      children: <span>{generator.word()}</span>,
    };

    render(<Tooltip {...props} />);
    const component = screen.getByTestId('cb-tooltip');

    expect(component).not.toHaveClass('is-visible');
    expect(component).toHaveTextContent(props.title);
  });

  it('shows up when use hovers the anchor element (children)', () => {
    const anchorText = generator.word();

    const props = {
      title: generator.sentence(),
      children: <span>{anchorText}</span>,
    };

    render(<Tooltip {...props} />);

    const component = screen.getByTestId('cb-tooltip');
    const anchor = screen.getByText(anchorText);

    userEvent.hover(anchor);

    expect(component).toHaveTextContent(props.title);
  });
});

describe('Tooltip Helpers', () => {
  describe('Tooltip positions', () => {
    it('calculates top position correctly', () => {
      const position = calculatePosition(
        'top',
        generator.element(),
        generator.target(),
      );

      expect(Object.keys(position)).toEqual(
        expect.arrayContaining(['top', 'left', 'placement']),
      );
      expect(position.placement).toBe('top');
    });

    it.skip('calculates right position correctly', () => {
      const position = calculatePosition(
        'right',
        generator.element(),
        generator.target(),
      );

      expect(Object.keys(position)).toEqual(
        expect.arrayContaining(['top', 'left', 'placement']),
      );
      expect(position.placement).toBe('right');
    });

    it('calculates bottom position correctly', () => {
      const position = calculatePosition(
        'bottom',
        generator.element(),
        generator.target(),
      );

      expect(Object.keys(position)).toEqual(
        expect.arrayContaining(['top', 'left', 'placement']),
      );
      expect(position.placement).toBe('bottom');
    });

    it.skip('calculates left position correctly', () => {
      const position = calculatePosition(
        'left',
        generator.element(),
        generator.target(),
      );

      expect(Object.keys(position)).toEqual(
        expect.arrayContaining(['top', 'left', 'placement']),
      );
      expect(position.placement).toBe('left');
    });

    it('defaults unknown position to top position correctly', () => {
      const position = calculatePosition(
        generator.word(),
        generator.element(),
        generator.target(),
      );

      expect(Object.keys(position)).toEqual(
        expect.arrayContaining(['top', 'left', 'placement']),
      );
      expect(position.placement).toBe('top');
    });
  });
});
