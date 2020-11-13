import React from 'react';

import Badge from './badge';
import generator from '../../../test/data-generator';

export default {
  title: 'Welcome/Atoms/Badge',
  component: Badge,
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
        This is me, a cool Badge ready to be played around. Try me :)
      </p>
      <Badge {...args}>{generator.name()}</Badge>
    </div>
  );
};

export const Playground = Template.bind({});
