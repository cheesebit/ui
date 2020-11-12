import React from 'react';
import { action } from '@storybook/addon-actions';

import Button from './button';

export default {
  title: 'Welcome/Atoms/Button',
  argTypes: { onClick: { action: 'clicked' } },
  component: Button,
  docs: {
    description: {
      story: 'some story *a*markdown**',
    },
  },
};

const Template = args => {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Button ready to be played around. Try me :)
      </p>
      <Button {...args} />
    </div>
  );
};

export const Playground = Template.bind({});

Playground.args = {
  children: 'Button',
};

export const Disabled = args => {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Button ready to be played around. Try me :)
      </p>
      <Button icon="create" {...args} disabled>
        Button
      </Button>
    </div>
  );
};
