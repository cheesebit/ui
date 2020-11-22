import React from 'react';

import ResizeWatcher from './resize-watcher';
import generator from '../../../test/data-generator';
import { mount } from '../../../test/helpers';

describe('ResizeWatcher', () => {
  it('updates host width successfully', () => {});

  it('call onResize prop successfully', () => {
    const props = {
      children: () => <div />,
      onResize: jest.fn(),
    };

    const { instance } = mount(<ResizeWatcher {...props} />);
    const state = { width: generator.natural() };
    const ref = { current: null };

    instance.setState(state);
    instance.publish();
    instance.ref = ref;

    expect(props.onResize).toHaveBeenCalledWith({
      ...state,
      ref,
    });
  });
});
