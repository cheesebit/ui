import React from 'react';

import Checkbox from './checkbox';
import generator from '../../../test/data-generator';

export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
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
        This is me, a cool Checkbox family ready to be played around. Try me :)
      </p>
      <div className="flex flex-col space-y-2">
        <Checkbox {...args}>{generator.name()}</Checkbox>
        <Checkbox {...args}>{generator.name()}</Checkbox>
        <Checkbox {...args}>{generator.name()}</Checkbox>
      </div>
    </div>
  );
};

export const Playground = Template.bind({});
