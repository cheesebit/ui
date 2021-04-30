import React from 'react';

import Input from './input';

export default {
  title: 'Atoms/Input',
  component: Input,
};

export function Playground(args) {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Input ready to be played around. Try me :)
      </p>

      <Input {...args} />
    </div>
  );
}
