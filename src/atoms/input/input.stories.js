import React from 'react';

import Input from './input';

export default {
  title: 'Welcome/Atoms/Input',
  component: Input,
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
        This is me, a cool Input ready to be played around. Try me :)
      </p>

      <Input {...args} />
    </div>
  );
};

export const Playground = Template.bind({});
