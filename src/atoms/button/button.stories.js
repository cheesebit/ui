import React from 'react';

import icons from '../icon/icon-mapping';
import Button from './button';
import { keys } from '../../common/toolset';

export default {
  title: 'Atoms/Button',
  argTypes: { onClick: { action: 'clicked' } },
  component: Button,

  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: keys(icons),
      },
    },
  },
};
export function Playground(args) {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Button ready to be played around. Try me :)
      </p>
      <Button {...args} />
    </div>
  );
}

Playground.args = {
  children: 'Button',
};
