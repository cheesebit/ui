import React from 'react';

import { Input } from '../input';
import Label from './label';

export default {
  title: 'Atoms/Label',
  component: Label,
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
        This is me, a cool Label (former Field) ready to be played around. Try
        me :)
      </p>

      <Label {...args}>
        <Input type="text" />
      </Label>
    </div>
  );
};

export const Playground = Template.bind({});