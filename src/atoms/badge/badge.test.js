import React from 'react';
import { composeStories } from '@storybook/testing-react';

import { render, screen } from '../../../test/helpers';
import * as stories from './badge.stories';
import generator from '../../../test/data-generator';

const { Default, Primary, Secondary, Terciary } = composeStories(stories);

describe('<Badge />', () => {
  it('renders correctly', () => {
    const props = { children: generator.word() };
    render(<Default {...props} />);

    const component = screen.getByTestId('cb-badge');
    expect(component).toHaveTextContent(props.children);
  });

  describe('with variant', () => {
    it(`renders correctly with variant primary`, () => {
      const props = { children: generator.word() };

      render(<Primary {...props} />);

      const component = screen.getByTestId('cb-badge');
      expect(component).toHaveTextContent(props.children);
      expect(component).toHaveClass('-primary');
    });

    it(`renders correctly with variant secondary`, () => {
      const props = { children: generator.word() };

      render(<Secondary {...props} />);

      const component = screen.getByTestId('cb-badge');
      expect(component).toHaveTextContent(props.children);
      expect(component).toHaveClass('-secondary');
    });

    it(`renders correctly with variant terciary`, () => {
      const props = { children: generator.word() };

      render(<Terciary {...props} />);

      const component = screen.getByTestId('cb-badge');
      expect(component).toHaveTextContent(props.children);
      expect(component).toHaveClass('-terciary');
    });
  });
});
