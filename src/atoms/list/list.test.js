import React from 'react';

import { render, screen } from '../../../test/helpers';
import { List } from './index';
import generator from '../../../test/data-generator';

describe('List', () => {
  it('renders correctly', () => {
    const props = {
      children: generator.word(),
    };

    render(<List {...props} />);
    const component = screen.getByTestId('cb-list');

    expect(component).toBeTruthy();
    expect(component).toHaveTextContent(props.children);
  });

  it('renders bordered correctly', () => {
    const props = {
      children: generator.word(),
      bordered: true,
    };

    render(<List {...props} />);
    const component = screen.getByTestId('cb-list');

    expect(component).toHaveClass('-bordered');
  });

  it('renders hoverable correctly', () => {
    const props = {
      children: generator.word(),
      hoverable: true,
    };

    render(<List {...props} />);
    const component = screen.getByTestId('cb-list');

    expect(component).toHaveClass('-hoverable');
  });

  it('renders striped correctly', () => {
    const props = {
      children: generator.word(),
      striped: true,
    };

    render(<List {...props} />);
    const component = screen.getByTestId('cb-list');

    expect(component).toHaveClass('-striped');
  });

  it('render list item correctly', () => {
    const props = {
      children: generator.sentence(),
    };

    render(<List.Item {...props} />);
    const component = screen.getByTestId('list-item');

    expect(component).toBeTruthy();
  });

  it('render disabled list item correctly', () => {
    const props = {
      children: generator.sentence(),
      disabled: true,
    };

    render(<List.Item {...props} />);
    const component = screen.getByTestId('list-item');

    expect(component).toBeTruthy();
    expect(component).toHaveClass('is-disabled');
  });
});
