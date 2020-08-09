import React from 'react';
import { shallow } from 'enzyme';

import { render, screen } from '../../../test/helpers';
import { List } from './index';
import generator from '../../../test/data-generator';

describe('List', () => {
  it('renders correctly', () => {
    const props = {
      children: generator.word(),
    };

    const { getByTestId } = render(<List {...props} />);
    const component = getByTestId('cb-list');

    expect(component).toBeTruthy();
    expect(component).toHaveTextContent(props.children);
  });

  it('renders bordered correctly', () => {
    const props = {
      children: generator.word(),
      bordered: true,
    };

    const { getByTestId } = render(<List {...props} />);
    const component = getByTestId('cb-list');

    expect(component).toHaveClass('-bordered');
  });

  it('renders hoverable correctly', () => {
    const props = {
      children: generator.word(),
      hoverable: true,
    };

    const { getByTestId } = render(<List {...props} />);
    const component = getByTestId('cb-list');

    expect(component).toHaveClass('-hoverable');
  });

  it('renders striped correctly', () => {
    const props = {
      children: generator.word(),
      striped: true,
    };

    const { getByTestId } = render(<List {...props} />);
    const component = getByTestId('cb-list');

    expect(component).toHaveClass('-striped');
  });

  it('render list item correctly', () => {
    const props = {
      children: generator.sentence(),
    };

    const { getByTestId } = render(<List.Item {...props} />);
    const component = getByTestId('list-item');

    expect(component).toBeTruthy();
  });

  it('render disabled list item correctly', () => {
    const props = {
      children: generator.sentence(),
      disabled: true,
    };

    const { getByTestId } = render(<List.Item {...props} />);
    const component = getByTestId('list-item');

    expect(component).toBeTruthy();
    expect(component).toHaveClass('is-disabled');
  });
});
