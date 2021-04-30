import React from 'react';

import generator from '../../../test/data-generator';
import Copy from './copy';

export default {
  title: 'Molecules/Copy',
  component: Copy,
};

const Template = args => {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Copy to Clipboard ready to be played around. Try me
        :)
      </p>

      <Copy value={generator.animal()} {...args} />
    </div>
  );
};

export const Playground = Template.bind({});
