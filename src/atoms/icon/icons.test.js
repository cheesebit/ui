import React from 'react';

import { Icon } from './index';

import { screen, render } from '../../../test/helpers';
import { keys } from '../../common/toolset';
import generator from '../../../test/data-generator';
import mapping from './icon-mapping';

describe('Icon', () => {
  it('renders correctly', () => {
    const props = {
      name: generator.pick(keys(mapping)),
    };

    const { getByLabelText } = render(<Icon {...props} />);
    const component = getByLabelText(props.name);

    expect(component).toBeTruthy();
  });

  it(`renders an '?' when icon does not exist`, () => {
    const props = {
      name: generator.word(),
    };

    render(<Icon {...props} />);

    expect(screen.getByText('?')).toBeTruthy();
  });
});
