import React from 'react';

import Image from './image';

export default {
  title: 'Atoms/Image',
  component: Image,
  docs: {
    description: {
      story: 'some story *a*markdown**',
    },
  },
  argTypes: {
    src: {
      control: {
        type: 'select',
        options: [
          'https://images.unsplash.com/photo-1578030639376-8e9cf3f26b68',
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
        ],
      },
    },
  },
};

const Template = args => {
  return (
    <div className="block">
      <p className="mb-2">
        This is me, a cool Image ready to be played around. Try me :)
      </p>

      <Image {...args} />
    </div>
  );
};

export const Playground = Template.bind({});