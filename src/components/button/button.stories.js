import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from './index';
import { withA11y } from '@storybook/addon-a11y';
import { asTestAttr } from '../../../test/helpers';

import { SIZE, TYPE, EMPHASIS } from './button';

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [withA11y],
  parameters: {
    a11y: {
      // optional selector which element to inspect
      element: asTestAttr('cb-button')
    }
  }
};

export const Text = () => (
  <Button onClick={action('clicked')}>Hello Button</Button>
);

export const Emphasis = () => (
  <React.Fragment>
    <Button
      onClick={action('clicked')}
      size={SIZE.MEDIUM}
      emphasis={EMPHASIS.LOW}
    >
      Click
    </Button>
    <Button
      onClick={action('clicked')}
      size={SIZE.MEDIUM}
      emphasis={EMPHASIS.MEDIUM}
    >
      Click
    </Button>
    <Button
      onClick={action('clicked')}
      size={SIZE.MEDIUM}
      emphasis={EMPHASIS.HIGH}
    >
      Click
    </Button>
  </React.Fragment>
);

export const Size = () => (
  <React.Fragment>
    <Button onClick={action('clicked')} size={SIZE.SMALL}>
      Click
    </Button>
    <Button onClick={action('clicked')} size={SIZE.MEDIUM}>
      Click
    </Button>
    <Button onClick={action('clicked')} size={SIZE.LARGE}>
      Click
    </Button>
  </React.Fragment>
);
