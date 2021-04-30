import React from 'react';

import Checkbox from './checkbox';
import generator from '../../../test/data-generator';

export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
};

export function Playground(args) {
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
}
