import React from 'react';

import { screen, render, userEvent } from '../../../test/helpers';
import { Tooltip } from './index';
import generator from '../../../test/data-generator';

describe('Tooltip', () => {
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

    expect(component).toHaveClass('is-visible');
    expect(component).toHaveTextContent(props.title);
  });
});
