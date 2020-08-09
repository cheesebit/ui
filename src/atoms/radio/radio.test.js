import React from 'react';

import { render, screen, fireEvent } from '../../../test/helpers';
import { Radio } from './index';
import generator from '../../../test/data-generator';

describe('Radio', () => {
  const props = {
    children: generator.word(),
    onChange: jest.fn(),
  };

  const { getByTestId } = render(<Radio {...props} />);

  const component = screen.getByTestId('cb-radio');
  const selector = getByTestId('selector');

  it('renders correctly', () => {
    expect(component).toHaveTextContent(props.children);
    expect(selector).toHaveAttribute('type', 'radio');
  });

  it('triggers onChange when clicked', () => {
    expect(selector.checked).toBe(false);
    fireEvent.click(selector);
    expect(selector.checked).toBe(true);
  });
});
