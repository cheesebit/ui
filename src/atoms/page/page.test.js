import React from 'react';

import { Page } from './index';

import { render, getByTestId } from '../../../test/helpers';
import generator from '../../../test/data-generator';

describe('Page', () => {
  it('renders correctly', () => {
    const props = {
      children: generator.word(),
    };

    const { getByTestId } = render(<Page {...props} />);
    const component = getByTestId('cb-page');

    expect(component).toBeTruthy();
    expect(component).toHaveTextContent(props.children);
  });

  it('renders header correctly', () => {
    const props = {
      children: generator.sentence(),
    };

    const { getByText } = render(<Page.Header {...props} />);
    const component = getByText(props.children);

    expect(component).toBeTruthy();
  });

  it('renders body correctly', () => {
    const props = {
      children: generator.sentence(),
    };

    const { getByText } = render(<Page.Body {...props} />);
    const component = getByText(props.children);

    expect(component).toBeTruthy();
  });
});
