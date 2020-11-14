import React from 'react';

import Icon from './icon';
import icons from './icon-mapping';
import { keys } from '../../common/toolset';

export default {
  title: 'Atoms/Icon',
  component: Icon,
  docs: {
    description: {
      story: 'some story *a*markdown**',
    },
  },
  argTypes: {
    name: {
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
        This is me, a cool Icon ready to be played around. Try me :)
      </p>

      <Icon {...args} />
    </div>
  );
};

export const Playground = Template.bind({});
