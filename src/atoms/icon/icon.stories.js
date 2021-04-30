import React from 'react';

import Icon from './icon';
import icons from './icon-mapping';
import { keys } from '../../common/toolset';

export default {
  title: 'Atoms/Icon',
  component: Icon,

  argTypes: {
    name: {
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
        This is me, a cool Icon ready to be played around. Try me :)
      </p>

      <Icon {...args} />
    </div>
  );
}
