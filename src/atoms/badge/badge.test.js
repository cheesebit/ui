import React from 'react';

import { Badge, Variant } from './index';
import { render, screen } from '../../../test/helpers';
import generator from '../../../test/data-generator';

describe('Badge', () => {
  it('renders correctly', () => {
    const props = { children: generator.word() };
    render(<Badge {...props} />);

    expect(screen.getByTestId('cb-badge')).toHaveTextContent(props.children);
  });

  describe('with variant', () => {
    it(`renders correctly with variant ${Variant.primary}`, () => {
      const props = { children: generator.word(), variant: Variant.primary };

      render(<Badge {...props} />);

      const component = screen.getByTestId('cb-badge');

      expect(component).toHaveTextContent(props.children);
      expect(component).toHaveClass('-primary');
    });

    it(`renders correctly with variant ${Variant.secondary}`, () => {
      const props = { children: generator.word(), variant: Variant.secondary };

      render(<Badge {...props} />);

      const component = screen.getByTestId('cb-badge');

      expect(component).toHaveTextContent(props.children);
      expect(component).toHaveClass('-secondary');
    });

    it(`renders correctly with variant ${Variant.terciary}`, () => {
      const props = { children: generator.word(), variant: Variant.terciary };

      render(<Badge {...props} />);

      const component = screen.getByTestId('cb-badge');

      expect(component).toHaveTextContent(props.children);
      expect(component).toHaveClass('-terciary');
    });
  });
});
