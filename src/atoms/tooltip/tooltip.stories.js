import React from 'react';

import generator from '../../../test/data-generator';
import Tooltip from './tooltip';

export default {
  title: 'Atoms/Tooltip',
  component: Tooltip,
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
        This is me, a cool Tooltip ready to be played around. Try me :)
      </p>

      <Tooltip {...args}>
        <span>{generator.word()}</span>
      </Tooltip>
    </div>
  );
};

export const Playground = Template.bind({});
