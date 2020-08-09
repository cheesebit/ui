import React from 'react';

import { Overlay, Theme } from './index';

import { render } from '../../../test/helpers';
import generator from '../../../test/data-generator';

describe('Overlay', () => {
  it('renders correctly', () => {
    const props = {
      children: generator.word(),
    };

    const { getByTestId } = render(<Overlay {...props} />);
    const component = getByTestId('cb-overlay');

    expect(component).toBeTruthy();
    expect(component).toHaveTextContent(props.children);
  });

  describe('with theme', () => {
    it(`renders correctly with theme ${Theme.light}`, () => {
      const props = {
        children: generator.word(),
        theme: Theme.light,
      };

      const { getByTestId } = render(<Overlay {...props} />);
      const component = getByTestId('cb-overlay');

      expect(component).toBeTruthy();
      expect(component).toHaveClass('-light');
    });

    it(`renders correctly with theme ${Theme.dark}`, () => {
      const props = {
        children: generator.word(),
        theme: Theme.dark,
      };

      const { getByTestId } = render(<Overlay {...props} />);
      const component = getByTestId('cb-overlay');

      expect(component).toBeTruthy();
      expect(component).toHaveClass('-dark');
    });
  });
});
