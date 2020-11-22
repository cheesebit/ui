import React from 'react';

import { render, mount } from '../../../test/helpers';
import generator from '../../../test/data-generator';
import ClickOutside from './click-outside';

describe('ClickOutside', () => {
  beforeEach(() => {
    window.setTimeout = jest.fn(fn => fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('render successfully', () => {
    const label = generator.word();

    const props = {
      children: () => (
        <React.Fragment>
          <label htmlFor="input">{label}</label>

          <input id="input" type="text" />
        </React.Fragment>
      ),
      disabled: false,
      onClickOutside: jest.fn(),
    };

    const { getByLabelText } = render(<ClickOutside {...props} />);
    getByLabelText(label);
  });

  it('ignores blur when disabled', () => {
    const text = generator.word();

    const props = {
      children: ({ ref }) => (
        <React.Fragment>
          <label htmlFor="input" data-testid="my-label">
            {text}
          </label>

          <input ref={ref} id="input" type="text" data-testid="my-input" />
        </React.Fragment>
      ),
      disabled: true,
      onClickOutside: jest.fn(),
    };

    const { instance } = mount(<ClickOutside {...props} />);

    instance.ref.current = {
      contains: jest.fn(() => false),
    };

    instance.handleBlur();

    expect(setTimeout).not.toHaveBeenCalled();
  });

  it('ignores blur when ref is null', () => {
    const text = generator.word();

    const props = {
      children: () => (
        <React.Fragment>
          <label htmlFor="input" data-testid="my-label">
            {text}
          </label>

          <input id="input" type="text" data-testid="my-input" />
        </React.Fragment>
      ),
      disabled: false,
      onClickOutside: jest.fn(),
    };

    const { instance } = mount(<ClickOutside {...props} />);
    instance.handleBlur({});

    expect(setTimeout).not.toHaveBeenCalled();
  });

  it('calls onClickOutside correctly', () => {
    const text = generator.word();

    const props = {
      children: ({ ref }) => (
        <React.Fragment>
          <label htmlFor="input" data-testid="my-label">
            {text}
          </label>

          <input ref={ref} id="input" type="text" data-testid="my-input" />
        </React.Fragment>
      ),
      disabled: false,
      onClickOutside: jest.fn(),
    };

    const { getByTestId, instance } = mount(<ClickOutside {...props} />);
    const input = getByTestId('my-input');

    instance.ref.current = {
      contains: jest.fn(() => false),
    };

    instance.handleBlur({});

    expect(setTimeout).toHaveBeenCalled();

    expect(props.onClickOutside).toHaveBeenCalled();
  });
});
