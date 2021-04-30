import React from 'react';

import generator from '../../../test/data-generator';
import Radio from './radio';

export default {
  title: 'Atoms/Radio',
  component: Radio,
};

export function Playground(args) {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Radio button ready to be played around. Try me :)
      </p>

      <div className="flex flex-col space-y">
        <Radio {...args} name="radio-generic" value="0">
          {generator.name()}
        </Radio>
        <Radio {...args} name="radio-generic" value="1">
          {generator.name()}
        </Radio>
        <Radio {...args} name="radio-generic" value="2">
          {generator.name()}
        </Radio>
      </div>
    </div>
  );
}
