import React from 'react';

import generator from '../../../test/data-generator';
import Spinner, { Variant } from './spinner';

export default {
  title: 'Atoms/Spinner',
  component: Spinner,
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
        This is me, a cool Link ready to be played around. Try me :)
      </p>

      <div className="flex flex-row space-x-4">
        <Spinner {...args} />
        <Spinner {...args} variant={Variant.primary} />
        <Spinner {...args} variant={Variant.secondary} />
        <Spinner {...args} variant={Variant.terciary} />
      </div>
    </div>
  );
};

export const Playground = Template.bind({});
