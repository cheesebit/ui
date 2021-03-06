import React from 'react';

import Tooltip from './tooltip';

export default {
  title: 'Atoms/Tooltip',
  component: Tooltip,
};

export function Playground(args) {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Tooltip ready to be played around. Try me :)
      </p>

      <Tooltip title="Hi there dear reader." {...args}>
        <span>Hover me to see my tooltip!</span>
      </Tooltip>
    </div>
  );
}
