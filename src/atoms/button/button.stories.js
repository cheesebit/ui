import React from 'react';
import { action } from '@storybook/addon-actions';

import icons from '../icon/icon-mapping';
import Button from './button';
import { keys } from '../../common/toolset';

export default {
  title: 'Atoms/Button',
  argTypes: { onClick: { action: 'clicked' } },
  component: Button,
  docs: {
    description: {
      story: 'some story *a*markdown**',
    },
  },
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: keys(icons),
      },
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
      <Button {...args} disabled>
        Button
      </Button>
    </div>
  );
};

export const Emphasis = args => {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Button ready to be played around. Try me :)
      </p>
      <div className="flex flex-row space-x-4">
        <Button {...args} emphasis="flat">
          Button
        </Button>
        <Button {...args} emphasis="ghost">
          Button
        </Button>
        <Button {...args} emphasis="text">
          Button
        </Button>
      </div>
    </div>
  );
};

export const Size = args => {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Button ready to be played around. Try me :)
      </p>
      <div className="flex flex-row space-x-4">
        <Button {...args} size="small">
          Button
        </Button>
        <Button {...args} size="medium">
          Button
        </Button>
        <Button {...args} size="large">
          Button
        </Button>
      </div>
    </div>
  );
};
